"""Automated tests for the POST /api/items/create endpoint.

Like test_items.py, these replace Supabase (and the logged-in user) with fakes,
so they run in GitHub Actions without real keys.
"""
import pytest
from fastapi.testclient import TestClient

from main import app
from dep.supabase import get_supabase, get_user
from schemas.user_schema import UserModel

# Same fields that insertItemReport() sends from the frontend
VALID_BODY = {
    "item_name": "Black Backpack",
    "item_description": "Black Jansport backpack with a blue keychain.",
    "longitude": -117.0719,
    "latitude": 32.7757,
}

FAKE_USER = UserModel(id="user-123", aud="authenticated", created_at="x", updated_at="x")


class FakeResult:
    def __init__(self, data):
        self.data = data


class FakeInsertQuery:
    """Pretends to be supabase.table("items").insert(...).execute()."""

    def __init__(self, db):
        self.db = db
        self.row = None

    def insert(self, row):
        self.row = row
        return self

    def execute(self):
        if self.db.fail:
            raise Exception("Simulated database error")
        saved = {"id": "new-id", "image_url": None, **self.row}
        self.db.inserted.append(saved)
        return FakeResult([saved])


class FakeSupabase:
    def __init__(self, fail=False):
        self.fail = fail
        self.inserted = []

    def table(self, name):
        return FakeInsertQuery(self)


client = TestClient(app)


def use_fakes(fake_db, logged_in=True):
    app.dependency_overrides[get_supabase] = lambda: fake_db
    if logged_in:
        app.dependency_overrides[get_user] = lambda: FAKE_USER


@pytest.fixture(autouse=True)
def reset_overrides():
    yield
    app.dependency_overrides.clear()


def test_insert_item_returns_201_and_saved_item():
    fake = FakeSupabase()
    use_fakes(fake)

    response = client.post("/api/items/create", json=VALID_BODY)

    assert response.status_code == 201


def test_insert_item_uses_owner_from_token_not_body():
    fake = FakeSupabase()
    use_fakes(fake)

    # even if someone sends an owner_id, the server must ignore it
    response = client.post("/api/items/create", json={**VALID_BODY, "owner_id": "someone-else"})

    assert response.status_code == 201
    assert fake.inserted[0]["owner_id"] == "user-123"


def test_insert_item_returns_401_without_token():
    use_fakes(FakeSupabase(), logged_in=False)

    response = client.post("/api/items/create", json=VALID_BODY)

    assert response.status_code == 401

def test_insert_item_returns_500_when_database_fails():
    use_fakes(FakeSupabase(fail=True))

    response = client.post("/api/items/create", json=VALID_BODY)

    assert response.status_code == 500
