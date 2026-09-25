# PlantUp — Prototype

A working demo of the idea from the pitch deck: **PlantUp runs the website, orders,
and after-sale care for a local nursery, so the nursery just keeps growing and
delivering.**

This is a college-project prototype, not a production system. It's built to be run
locally and demoed live — see [What this demo proves](#what-this-demo-proves) below.

## What's in here

```
plantup/
  backend/     FastAPI + SQLite — plant catalog, orders, nursery feed
  frontend/    React + TypeScript + Tailwind — storefront, cart, care guides
```

## How it maps to the pitch deck

| Deck slide | What it looks like here |
|---|---|
| "How It Works" (4 handoffs) | Customer orders on the storefront → order appears instantly on `/nursery` → (nursery would deliver in real life) → QR on the confirmation page opens the care guide |
| QR care-guide system | Every order confirmation shows a real, scannable QR code linking to `/care-guide/:plantId` |
| "We manage orders, customer queries, updates" | The `/nursery` page is the nursery owner's entire interface — no store to configure |
| 15% commission (Phase 1) | Not implemented — there's no payment processing in this prototype, since the deck itself frames commission as untested |

## Running it locally

You need Python 3.10+ and Node.js 18+.

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

This creates `plantup.db` (SQLite) on first run and seeds it with 6 plants.
Check it's working: open http://localhost:8000/docs — FastAPI's interactive API docs.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

The frontend expects the backend at `http://localhost:8000` — see `frontend/src/api.ts`
if you need to change the port.

## Demo script (for your presentation)

1. Open the storefront (`/`) — this is the nursery's PlantUp-run store.
2. Add a plant to cart, check out with any name/phone/address.
3. Land on the confirmation page — point out the **real QR code**. Scan it with your
   phone (both devices need to be on the same Wi-Fi, or use your laptop's local IP
   instead of `localhost` in the URL) to open the care guide on your phone.
4. Open `/nursery` in another tab — show the order you just placed appearing there,
   exactly as a nursery owner would see it. This is the "we notify the nursery" step.
5. Say plainly: this is a prototype proving the *flow* works — no payments, no auth,
   and the commission model is untested, exactly as the deck says.

## What this demo proves (and doesn't)

**Proves:** the core loop — order → nursery notification → QR care guide — works
end-to-end as a piece of software, and is simple enough that a non-technical nursery
owner never touches a website builder.

**Doesn't cover (by design, matching the deck's own "Action Plan"):**
- Payments / commission collection
- Authentication (customer accounts, nursery login)
- Real delivery/logistics integration
- The Phase 2/3 features (photo plant diagnosis, promotions)

These are the next steps the deck itself lays out — talk to nurseries, run a pilot
with one real nursery's catalog, then decide what to build next based on real data.

## Extending it

- **Swap SQLite for MySQL:** only `backend/database.py` needs to change
  (`DATABASE_URL`) plus `pip install pymysql`. No model or route code changes.
- **Add authentication:** FastAPI's own docs have a straightforward OAuth2/JWT guide;
  add a `users` table and a login page before wiring it up.
- **Deploy it:** backend to Render/Railway, frontend to Vercel/Netlify — both have
  free tiers and this project's structure needs no changes to deploy as-is beyond
  setting `frontend/src/api.ts`'s `BASE_URL` to your deployed backend's URL.

## Tech stack

- **Backend:** FastAPI, SQLAlchemy, SQLite, Pydantic
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router, qrcode.react
