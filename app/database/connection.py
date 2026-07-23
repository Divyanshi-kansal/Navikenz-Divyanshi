import os
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv

load_dotenv()

class DatabaseConnectionSingleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(DatabaseConnectionSingleton, cls).__new__(cls)
            database_url = os.getenv("DATABASE_URL")
            
            print("Classic Singleton Pattern: Initializing the PostgreSQL Engine Pool...")
            try:
                cls._instance.engine = create_engine(database_url, pool_size=10, max_overflow=20)
            except SQLAlchemyError as e:
                print(f"Error initializing database engine: {e}")
                raise e
        return cls._instance

# Create the singleton instance and expose the engine
db_singleton = DatabaseConnectionSingleton()
engine = db_singleton.engine