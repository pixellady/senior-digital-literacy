from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai_tools import SerperDevTool

# Name contract (same rule as researcher / reporting_analyst in the CrewAI example):
#   @agent method name  ==  agents.yaml key  ==  tasks.yaml `agent:` value
#   @task  method name  ==  tasks.yaml key
# Role, goal, backstory, llm, max_iter, allow_delegation come from YAML via config=.


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
            tools=[SerperDevTool()],
        )

    @task
    def tutor_turn_task(self) -> Task:
        return Task(
            config=self.tasks_config["tutor_turn_task"],
        )

    @task
    def scam_check_task(self) -> Task:
        return Task(
            config=self.tasks_config["scam_check_task"],
        )

    def tutor_crew(self) -> Crew:
        """One tutor turn. Flow kicks this off when route_intent is TUTOR."""
        return Crew(
            agents=[self.step_by_step_tutor()],
            tasks=[self.tutor_turn_task()],
            process=Process.sequential,
            memory=False,
        )

    def scam_crew(self) -> Crew:
        """One scam-check turn. Flow kicks this off when route_intent is SCAM."""
        return Crew(
            agents=[self.scam_detector()],
            tasks=[self.scam_check_task()],
            process=Process.sequential,
            memory=False,
        )

    @crew
    def crew(self) -> Crew:
        """CrewBase default. Prefer Flow + tutor_crew/scam_crew for a user turn."""
        return self.tutor_crew()
