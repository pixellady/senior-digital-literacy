#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from senior_digital_literacy.crew import SeniorDigitalLiteracy
from senior_digital_literacy.flow import SeniorDigitalLiteracyFlow

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def _demo_inputs():
    """Same shape as POST /api/v1/chat will send into Flow.kickoff."""
    return {
        "user_message": "Help me send an email to my granddaughter.",
        "explicit_path": "tutor",
        "client_action": "none",
        "learning_track": "beginner",
        "device_context": "unknown",
        "learner_goal": "send an email",
        "last_step": "none yet",
        "suspicious_content": "",
        "mode": "normal",
        "current_year": str(datetime.now().year),
    }


def kickoff():
    """Product path: Flow start → route → one crew → final output."""
    flow = SeniorDigitalLiteracyFlow()
    result = flow.kickoff(inputs=_demo_inputs())
    print(result)
    return result


def plot():
    SeniorDigitalLiteracyFlow().plot()


def run():
    """Alias so `crewai run` uses the Flow, not a sequential two-task crew."""
    return kickoff()


def train():
    """
    Train the tutor crew for a given number of iterations.
    """
    inputs = _demo_inputs()
    try:
        SeniorDigitalLiteracy().tutor_crew().train(
            n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs
        )

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")


def replay():
    """
    Replay the tutor crew execution from a specific task.
    """
    try:
        SeniorDigitalLiteracy().tutor_crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")


def test():
    """
    Test the tutor crew execution and returns the results.
    """
    inputs = _demo_inputs()

    try:
        SeniorDigitalLiteracy().tutor_crew().test(
            n_iterations=int(sys.argv[1]), eval_llm=sys.argv[2], inputs=inputs
        )

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")


def run_with_trigger():
    """
    Run the flow with trigger payload.
    """
    import json

    if len(sys.argv) < 2:
        raise Exception("No trigger payload provided. Please provide JSON payload as argument.")

    try:
        trigger_payload = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        raise Exception("Invalid JSON payload provided as argument")

    flow = SeniorDigitalLiteracyFlow()
    try:
        result = flow.kickoff(inputs={**_demo_inputs(), **trigger_payload})
        return result
    except Exception as e:
        raise Exception(f"An error occurred while running the flow with trigger: {e}")


if __name__ == "__main__":
    kickoff()
