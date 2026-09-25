import { useEffect, useState } from "react";
import type { Order } from "../types";
import { api } from "../api";

export default function NurseryDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    load();
  }, []);

  function load() {
    setStatus("loading");
    api
      .getOrders()
      .then((data) => {
        setOrders(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-3xl text-forest-dark">Nursery order queue</h1>
        <button
          onClick={load}
          className="text-sm font-medium border border-forest/20 rounded-full px-4 py-2 hover:bg-sage transition-colors"
        >
          Refresh
        </button>
      </div>
      <p className="text-ink/60 mb-8">
        This is what the nursery owner sees — every order that comes in through PlantUp,
        ready to pack and hand to a local courier. No storefront to manage, just this list.
      </p>

      {status === "loading" && <p className="text-ink/60">Loading orders…</p>}
      {status === "error" && (
        <p className="text-clay-dark">Couldn't reach the PlantUp server. Is the backend running?</p>
      )}
      {status === "ready" && orders.length === 0 && (
        <p className="text-ink/60">No orders yet — place one from the shop to see it appear here.</p>
      )}

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-forest/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-sage flex items-center justify-center text-2xl shrink-0">
              {order.plant.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-forest-dark">
                {order.plant.name} × {order.quantity}
              </p>
              <p className="text-sm text-ink/60 truncate">
                {order.customer_name} · {order.phone}
              </p>
              <p className="text-sm text-ink/50 truncate">{order.address}</p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="inline-block text-xs font-medium uppercase tracking-wide bg-clay/10 text-clay-dark px-3 py-1 rounded-full mb-1">
                {order.status}
              </span>
              <p className="text-xs text-ink/40">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
