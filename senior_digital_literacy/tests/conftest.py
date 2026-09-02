"""Reset the in-process chat limiter so HTTP tests do not share a window."""

import pytest

from senior_digital_literacy.runtime_flags import chat_limiter


@pytest.fixture(autouse=True)
def reset_chat_limiter():
    chat_limiter.reset()
    yield
    chat_limiter.reset()
