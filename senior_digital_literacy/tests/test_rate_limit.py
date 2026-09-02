"""In-process sliding window: 10/min and 40/hour stop a chat POST loop."""

from senior_digital_literacy.rate_limit import SlidingWindowLimiter


def test_eleventh_request_in_a_minute_is_denied():
    limiter = SlidingWindowLimiter(per_minute=10, per_hour=40)
    start = 1_000.0
    for offset in range(10):
        assert limiter.allow("127.0.0.1", now=start + offset) is True
    assert limiter.allow("127.0.0.1", now=start + 10) is False


def test_minute_window_rolls_forward():
    limiter = SlidingWindowLimiter(per_minute=10, per_hour=40)
    start = 1_000.0
    for offset in range(10):
        assert limiter.allow("127.0.0.1", now=start + offset) is True
    assert limiter.allow("127.0.0.1", now=start + 10) is False
    assert limiter.allow("127.0.0.1", now=start + 61) is True


def test_hour_cap_blocks_even_when_minute_window_is_fresh():
    limiter = SlidingWindowLimiter(per_minute=10, per_hour=40)
    start = 1_000.0
    for burst in range(4):
        burst_at = start + (burst * 70)
        for offset in range(10):
            assert limiter.allow("127.0.0.1", now=burst_at + offset) is True
    assert limiter.allow("127.0.0.1", now=start + 280) is False


def test_keys_are_independent():
    limiter = SlidingWindowLimiter(per_minute=1, per_hour=40)
    assert limiter.allow("a", now=1.0) is True
    assert limiter.allow("a", now=2.0) is False
    assert limiter.allow("b", now=2.0) is True


def test_denied_hit_is_not_recorded():
    limiter = SlidingWindowLimiter(per_minute=1, per_hour=40)
    assert limiter.allow("127.0.0.1", now=1.0) is True
    assert limiter.allow("127.0.0.1", now=2.0) is False
    assert limiter.allow("127.0.0.1", now=2.0) is False
    assert limiter.allow("127.0.0.1", now=62.0) is True
