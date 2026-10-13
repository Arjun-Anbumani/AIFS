from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

from app.core import settings

client: MongoClient = MongoClient(settings.MONGODB_URI)
db = client[settings.DATABASE_NAME]


def verify_connection() -> bool:
    try:
        client.admin.command("ping")
        return True
    except ConnectionFailure:
        return False
