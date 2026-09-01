from __future__ import annotations

import os
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from senior_digital_literacy.flow import SeniorDigitalLiteracyFlow

app = FastAPI(title="Senior Digital Literacy API", version="0.1.0")

_cors = os.getenv("CORS_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in _cors.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ClientAction = Literal[
    "none",
    "pause",
    "resume",
    "explain_simpler",
    "repeat_step",
    "start_over",
    "get_extra_help",
    "confirm_step",
]
ExplicitPath = Literal["tutor", "scam"]
TrackOverride = Literal["beginner", "partial_user", "no_device"]


class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str = Field(..., min_length=1, max_length=4000)
    explicit_path: ExplicitPath | None = None
    client_action: ClientAction = "none"
    track_override: TrackOverride | None = None


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/v1/chat")
def chat(request: ChatRequest) -> dict[str, Any]:
    try:
        flow = SeniorDigitalLiteracyFlow()
        result = flow.kickoff(
            inputs={
                "session_id": request.session_id,
                "user_message": request.message.strip(),
                "explicit_path": request.explicit_path,
                "client_action": request.client_action,
                "learning_track": request.track_override or "beginner",
                "suspicious_content": request.message.strip()
                if request.explicit_path == "scam"
                else "",
                "mode": "normal",
            }
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={
                "error": {
                    "code": "INTERNAL",
                    "message": "Something went wrong. Please try again.",
                    "retryable": True,
                }
            },
        ) from exc

    if not isinstance(result, dict) or "session_id" not in result:
        raise HTTPException(
            status_code=500,
            detail={
                "error": {
                    "code": "INTERNAL",
                    "message": "Something went wrong. Please try again.",
                    "retryable": True,
                }
            },
        )
    return result


def serve() -> None:
    import uvicorn

    uvicorn.run(
        "senior_digital_literacy.api:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", "8000")),
    )
