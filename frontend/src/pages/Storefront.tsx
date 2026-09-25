import { useEffect, useState } from "react";
import type { Plant } from "../types";
import { api } from "../api";
import PlantCard from "../components/PlantCard";

export default function Storefront() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    api
      .getPlants()
      .then((data) => {
        setPlants(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="max-w-xl mb-10">
        <p className="text-clay-dark font-medium text-sm mb-2">Green Thumb Nursery, run on PlantUp</p>
        <h1 className="font-display text-4xl text-forest-dark leading-tight mb-3">
          Plants that arrive with someone who tells you how to keep them alive.
        </h1>
        <p className="text-ink/70">
          Every order comes with a QR care card. Scan it after delivery and you'll always
          know exactly how much light and water your plant needs.
        </p>
      </div>

      {status === "loading" && <p className="text-ink/60">Loading the catalog…</p>}
      {status === "error" && (
        <p className="text-clay-dark">
          Couldn't reach the PlantUp server. Make sure the backend is running on port 8000.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
}
