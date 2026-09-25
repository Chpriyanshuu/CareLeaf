from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models
import schemas
import seed

Base.metadata.create_all(bind=engine)
seed.run()

app = FastAPI(title="PlantUp API")

# Wide-open CORS for the prototype — the frontend runs on a different
# port during local dev. Tighten this to a specific origin before any
# real deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/plants", response_model=list[schemas.PlantOut])
def list_plants(db: Session = Depends(get_db)):
    return db.query(models.Plant).all()


@app.get("/api/plants/{plant_id}", response_model=schemas.PlantOut)
def get_plant(plant_id: int, db: Session = Depends(get_db)):
    plant = db.query(models.Plant).filter(models.Plant.id == plant_id).first()
    if not plant:
        raise HTTPException(404, "Plant not found")
    return plant


@app.post("/api/orders", response_model=schemas.OrderOut)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    plant = db.query(models.Plant).filter(models.Plant.id == order.plant_id).first()
    if not plant:
        raise HTTPException(404, "Plant not found")

    db_order = models.Order(**order.model_dump())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


@app.get("/api/orders", response_model=list[schemas.OrderOut])
def list_orders(db: Session = Depends(get_db)):
    # Newest first — this is the "nursery notification" view: whoever is
    # packing orders opens this page to see what just came in.
    return db.query(models.Order).order_by(models.Order.created_at.desc()).all()


@app.get("/api/orders/{order_id}", response_model=schemas.OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    return order


@app.get("/")
def root():
    return {"status": "PlantUp API running", "docs": "/docs"}
