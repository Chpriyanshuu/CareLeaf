import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import type { Order } from "../types";
import { api } from "../api";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const ids = (params.get("ids") ?? "")
      .split(",")
      .filter(Boolean)
      .map(Number);

    if (ids.length === 0) {
      setStatus("error");
      return;
    }

    Promise.all(ids.map((id) => api.getOrder(id)))
      .then((data) => {
        setOrders(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [params]);

  if (status === "loading") {
    return <p className="max-w-2xl mx-auto px-6 py-20 text-center text-ink/60">Loading your order…</p>;
  }

  if (status === "error" || orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-ink/60 mb-6">Couldn't find that order.</p>
        <Link to="/" className="text-forest-dark font-medium underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <p className="text-5xl mb-3">✅</p>
        <h1 className="font-display text-3xl text-forest-dark mb-2">Order placed</h1>
        <p className="text-ink/70">
          The nursery has been notified and is packing your order for delivery.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-forest/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="shrink-0 bg-white p-2 rounded-lg border border-forest/10">
              <QRCodeSVG
                value={`${window.location.origin}/care-guide/${order.plant.id}`}
                size={120}
                fgColor="#28402F"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-wide text-clay-dark font-medium mb-1">
                Order #{order.id}
              </p>
              <h2 className="font-display text-xl text-forest-dark mb-1">
                {order.plant.emoji} {order.plant.name} × {order.quantity}
              </h2>
              <p className="text-sm text-ink/60 mb-3">
                Scan this QR after delivery to open the plant's care guide —
                it'll be printed on the card that ships with your order.
              </p>
              <Link
                to={`/care-guide/${order.plant.id}`}
                className="text-sm font-medium text-forest-dark underline"
              >
                Preview the care guide now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/" className="text-forest-dark font-medium underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
