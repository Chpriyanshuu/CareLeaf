import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Plant } from "../types";
import { api } from "../api";

export default function CareGuide() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!plantId) return;
    api
      .getPlant(Number(plantId))
      .then((data) => {
        setPlant(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [plantId]);

  if (status === "loading") {
    return <p className="max-w-xl mx-auto px-6 py-20 text-center text-ink/60">Loading care guide…</p>;
  }

  if (status === "error" || !plant) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <p className="text-ink/60 mb-6">Couldn't find a care guide for this plant.</p>
        <Link to="/" className="text-forest-dark font-medium underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const tips = plant.care_tips.split("\n").filter(Boolean);

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <p className="text-6xl mb-3">{plant.emoji}</p>
        <p className="text-xs uppercase tracking-wide text-clay-dark font-medium mb-1">
          Care guide
        </p>
        <h1 className="font-display text-3xl text-forest-dark">{plant.name}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-sage rounded-xl p-5">
          <p className="text-sm font-medium text-forest-dark mb-1">☀️ Light</p>
          <p className="text-sm text-ink/70">{plant.light}</p>
        </div>
        <div className="bg-sage rounded-xl p-5">
          <p className="text-sm font-medium text-forest-dark mb-1">💧 Water</p>
          <p className="text-sm text-ink/70">{plant.water}</p>
        </div>
      </div>

      <div className="bg-white border border-forest/10 rounded-xl p-5">
        <p className="text-sm font-medium text-forest-dark mb-3">Keep it thriving</p>
        <ul className="flex flex-col gap-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink/70">
              <span className="text-clay-dark">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-xs text-ink/40 mt-8">
        This is the page a customer's QR care card opens after delivery.
      </p>
    </div>
  );
}
