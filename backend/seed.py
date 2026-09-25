"""Seed the database with a small nursery catalog. Safe to re-run."""
from database import SessionLocal, engine, Base
from models import Plant

Base.metadata.create_all(bind=engine)

PLANTS = [
    dict(
        name="Money Plant (Pothos)",
        emoji="🌿",
        price=249,
        short_desc="The classic low-maintenance climber. Nearly impossible to kill.",
        difficulty="Very Easy",
        light="Bright, indirect light. Tolerates low light too.",
        water="Water when the top inch of soil feels dry — about once a week.",
        care_tips=(
            "Wipe leaves monthly so they can breathe.\n"
            "Trim leggy vines to encourage bushier growth.\n"
            "Yellow leaves usually mean overwatering, not underwatering."
        ),
    ),
    dict(
        name="Snake Plant",
        emoji="🐍",
        price=399,
        short_desc="Sculptural, upright leaves. Thrives on neglect.",
        difficulty="Very Easy",
        light="Any light — from a dark corner to full sun.",
        water="Water every 2-3 weeks. Let soil dry out fully between waterings.",
        care_tips=(
            "Overwatering is the #1 killer — when in doubt, skip a week.\n"
            "Repot only every 2-3 years; it likes being snug.\n"
            "Great for bedrooms — releases oxygen at night."
        ),
    ),
    dict(
        name="Peace Lily",
        emoji="🌸",
        price=349,
        short_desc="Glossy leaves with elegant white blooms. Tells you when it's thirsty.",
        difficulty="Easy",
        light="Medium, indirect light. Avoid direct sun.",
        water="Water when leaves start to droop slightly — roughly weekly.",
        care_tips=(
            "Drooping leaves = water it now, it perks back up in hours.\n"
            "Mist occasionally — it enjoys humidity.\n"
            "Remove spent flowers to encourage new blooms."
        ),
    ),
    dict(
        name="ZZ Plant",
        emoji="🪴",
        price=449,
        short_desc="Waxy, dark-green leaves. Built for forgetful plant parents.",
        difficulty="Very Easy",
        light="Low to bright indirect light.",
        water="Water every 2-3 weeks, less in winter.",
        care_tips=(
            "Stores water in its rhizomes — underwatering is safer than over.\n"
            "Wipe leaves to keep their natural shine.\n"
            "Keep away from curious pets — mildly toxic if chewed."
        ),
    ),
    dict(
        name="Areca Palm",
        emoji="🌴",
        price=599,
        short_desc="Feathery fronds that bring a resort feel indoors.",
        difficulty="Moderate",
        light="Bright, indirect light — a few hours of morning sun is fine.",
        water="Keep soil lightly moist; water 1-2 times a week.",
        care_tips=(
            "Brown tips usually mean dry air — mist regularly.\n"
            "Rotate the pot weekly for even growth.\n"
            "Feed with diluted fertilizer once a month in growing season."
        ),
    ),
    dict(
        name="Jade Plant",
        emoji="🌵",
        price=299,
        short_desc="Chubby, coin-shaped leaves. A classic gifting succulent.",
        difficulty="Easy",
        light="Bright light — a sunny windowsill is ideal.",
        water="Water deeply, then let soil dry out completely — every 2 weeks.",
        care_tips=(
            "Wrinkled leaves mean it's thirsty; mushy leaves mean overwatered.\n"
            "Use a pot with drainage holes — non-negotiable.\n"
            "Considered a symbol of good luck — popular as a housewarming gift."
        ),
    ),
]


def run():
    db = SessionLocal()
    try:
        if db.query(Plant).count() == 0:
            for p in PLANTS:
                db.add(Plant(**p))
            db.commit()
            print(f"Seeded {len(PLANTS)} plants.")
        else:
            print("Plants already seeded, skipping.")
    finally:
        db.close()


if __name__ == "__main__":
    run()
