"""
Database setup for PlantUp.

Uses SQLite for the prototype so the whole demo runs with zero external
services. Swapping to MySQL later only means changing DATABASE_URL below
and installing a MySQL driver (e.g. pymysql) — none of the model or route
code needs to change.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./plantup.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
