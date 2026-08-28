from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.tasks.task_output import TaskOutput

from senior_digital_literacy.schemas import (
    ScamTurnForm,
    TutorTurnForm,
    parse_json_object,
)
from senior_digital_literacy.tools.scam_library_tool import SearchScamLibraryTool

# Name contract:
#   @agent method name  ==  agents.yaml key  ==  tasks.yaml `agent:` value
#   @task  method name  ==  tasks.yaml key
# Role, goal, backstory, llm, max_iter, allow_delegation come from YAML via config=.


def _validate_tutor_form(result: TaskOutput) -> tuple[bool, TaskOutput | str]:
    """Accept fenced JSON. Do not retry the agent for markdown wrapping."""
    try:
        form = (
            result.pydantic
            if isinstance(result.pydantic, TutorTurnForm)
            else TutorTurnForm.model_validate(parse_json_object(result.raw))
        )
    except Exception as exc:
        return (False, f"Must fill named form TutorTurnForm with valid JSON: {exc}")
    if not form.content.text.strip():
        return (False, "content.text must not be empty")
    if form.content.risk_level is not None:
        return (False, "tutor content.risk_level must be null")
    result.pydantic = form
    result.raw = form.model_dump_json()
    return (True, result)


def _validate_scam_form(result: TaskOutput) -> tuple[bool, TaskOutput | str]:
    """Accept fenced JSON. Do not retry the agent for markdown wrapping."""
    try:
        form = (
            result.pydantic
            if isinstance(result.pydantic, ScamTurnForm)
            else ScamTurnForm.model_validate(parse_json_object(result.raw))
        )
    except Exception as exc:
        return (False, f"Must fill named form ScamTurnForm with valid JSON: {exc}")
    if not form.content.text.strip():
        return (False, "content.text must not be empty")
    result.pydantic = form
    result.raw = form.model_dump_json()
    return (True, result)


@CrewBase
class SeniorDigitalLiteracy():
    """Senior Digital Literacy crew"""

    agents: list[BaseAgent]
    tasks: list[Task]

    @agent
    def step_by_step_tutor(self) -> Agent:
        return Agent(
            config=self.agents_config["step_by_step_tutor"],
            verbose=True,
        )

    @agent
    def scam_detector(self) -> Agent:
        return Agent(
            config=self.agents_config["scam_detector"],
            verbose=True,
            tools=[SearchScamLibraryTool()],
        )

    @task
    def tutor_turn_task(self) -> Task:
        return Task(
            config=self.tasks_config["tutor_turn_task"],
            output_pydantic=TutorTurnForm,
            guardrail=_validate_tutor_form,
            guardrail_max_retries=0,
        )

    @task
    def scam_check_task(self) -> Task:
        return Task(
            config=self.tasks_config["scam_check_task"],
            output_pydantic=ScamTurnForm,
            guardrail=_validate_scam_form,
            guardrail_max_retries=0,
        )

    def tutor_crew(self) -> Crew:
        """One tutor turn. Flow kicks this off when route_intent is TUTOR."""
        return Crew(
            agents=[self.step_by_step_tutor()],
            tasks=[self.tutor_turn_task()],
            process=Process.sequential,
            memory=False,
            tracing=True,
            verbose=True,
        )

    def scam_crew(self) -> Crew:
        """One scam-check turn. Flow kicks this off when route_intent is SCAM."""
        return Crew(
            agents=[self.scam_detector()],
            tasks=[self.scam_check_task()],
            process=Process.sequential,
            memory=False,
            tracing=True,
            verbose=True,
        )

    @crew
    def crew(self) -> Crew:
        """CrewBase default. Prefer Flow + tutor_crew/scam_crew for a user turn."""
        return self.tutor_crew()
