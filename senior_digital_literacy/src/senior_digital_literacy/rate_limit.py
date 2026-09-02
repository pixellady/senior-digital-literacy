from __future__ import annotations

from collections import defaultdict, deque
import threading
import time


class SlidingWindowLimiter:
    """In-process allow/deny. First check that can fail wins; a hit is recorded only on allow."""

    def __init__(self, per_minute: int, per_hour: int) -> None:
        self.per_minute = per_minute
        self.per_hour = per_hour
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()

    def allow(self, key: str, *, now: float | None = None) -> bool:
        stamp = time.monotonic() if now is None else now
        minute_ago = stamp - 60
        hour_ago = stamp - 3600
        with self._lock:
            window = self._hits[key]
            while window and window[0] < hour_ago:
                window.popleft()
            in_hour = len(window)
            in_minute = sum(1 for hit in window if hit >= minute_ago)
            if in_minute >= self.per_minute or in_hour >= self.per_hour:
                return False
            window.append(stamp)
            return True
