from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    emoji = Column(String, nullable=False, default="🪴")
    price = Column(Float, nullable=False)
    short_desc = Column(String, nullable=False)
    difficulty = Column(String, nullable=False, default="Easy")

    # Care guide content — what the QR card opens after delivery
    light = Column(String, nullable=False)
    water = Column(String, nullable=False)
    care_tips = Column(Text, nullable=False)  # newline-separated tips

    orders = relationship("Order", back_populates="plant")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)

    customer_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)

    status = Column(String, nullable=False, default="Placed")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    plant = relationship("Plant", back_populates="orders")
