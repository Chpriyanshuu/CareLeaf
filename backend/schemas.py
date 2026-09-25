from datetime import datetime
from pydantic import BaseModel, ConfigDict


class PlantOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    emoji: str
    price: float
    short_desc: str
    difficulty: str
    light: str
    water: str
    care_tips: str


class OrderCreate(BaseModel):
    plant_id: int
    quantity: int = 1
    customer_name: str
    phone: str
    address: str


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    plant_id: int
    quantity: int
    customer_name: str
    phone: str
    address: str
    status: str
    created_at: datetime
    plant: PlantOut
