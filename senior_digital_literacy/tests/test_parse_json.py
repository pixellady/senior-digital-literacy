"""Unit: parse_json_object (CrewAI fenced JSON)."""

import json

import pytest

from senior_digital_literacy.schemas import parse_json_object


def test_parse_plain_object():
    assert parse_json_object('{"a": 1}') == {"a": 1}


def test_parse_markdown_fenced_json():
    raw = """```json
{"agent_id": "scam_detector", "ok": true}
```"""
    assert parse_json_object(raw) == {"agent_id": "scam_detector", "ok": True}


def test_parse_rejects_non_object():
    with pytest.raises(ValueError, match="object"):
        parse_json_object("[1, 2]")


def test_parse_rejects_garbage():
    with pytest.raises(json.JSONDecodeError):
        parse_json_object("not-json")
