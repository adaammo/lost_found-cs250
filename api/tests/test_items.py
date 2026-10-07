"""Automated tests for the GET /api/items endpoint.

These tests replace the real Supabase client with a fake one, so they
run without internet access or real API keys (for example, in GitHub Actions).
"""
import pytest
from fastapi.testclient import TestClient

from main import app
from dep.supabase import get_supabase_public

FAKE_ITEMS = [
    {
        "id": "1",
        "item_name": "Black Backpack",
        "item_description": "Black Jansport backpack with a blue keychain.",
        "item_type": "lost",
        "image_url": None,
        "longitude": -117.0719,
        "latitude": 32.7757,
        "resolved": False,
        "created_at": "2026-09-22T09:30:00Z",
    }
]


class FakeResult:
    def __init__(self, data):
        self.data = data


class FakeQuery:
    def __init__(self, data, fail):
        self.data = data
        self.fail = fail

    def select(self, *args, **kwargs):
        return self

    def execute(self):
        if self.fail:
            raise Exception("Simulated database error")
        return FakeResult(self.data)


class FakeSupabase:
    """Pretends to be the Supabase client used by ItemsService."""

    def __init__(self, data=None, fail=False):
        self.data = data if data is not None else []
        self.fail = fail
        self.requested_table = None

    def table(self, name):
        self.requested_table = name
        return FakeQuery(self.data, self.fail)


client = TestClient(app)


def use_fake_db(fake):
    app.dependency_overrides[get_supabase_public] = lambda: fake


@pytest.fixture(autouse=True)
def reset_overrides():
    yield
    app.dependency_overrides.clear()


def test_get_items_returns_200_and_item_list():
    fake = FakeSupabase(data=FAKE_ITEMS)
    use_fake_db(fake)

    response = client.get("/api/items")

    assert response.status_code == 200
    assert response.json() == {"items": FAKE_ITEMS}
    assert fake.requested_table == "items"


def test_get_items_returns_empty_list_when_no_items():
    use_fake_db(FakeSupabase(data=[]))

    response = client.get("/api/items")

    assert response.status_code == 200
    assert response.json() == {"items": []}


def test_get_items_returns_500_when_database_fails():
    use_fake_db(FakeSupabase(fail=True))

    response = client.get("/api/items")

    assert response.status_code == 500
    assert "detail" in response.json()
