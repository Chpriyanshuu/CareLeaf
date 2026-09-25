import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { api } from "../api";

export default function Checkout() {
  const { lines, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-ink/60 mb-6">Your cart is empty, so there's nothing to check out.</p>
        <Link to="/" className="text-forest-dark font-medium underline">
          Back to shop
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const orders = await Promise.all(
        lines.map((line) =>
          api.createOrder({
            plant_id: line.plant.id,
            quantity: line.quantity,
            customer_name: form.name,
            phone: form.phone,
            address: form.address,
          })
        )
      );
      clearCart();
      const ids = orders.map((o) => o.id).join(",");
      navigate(`/order-confirmation?ids=${ids}`);
    } catch {
      setError("Couldn't place the order — check the backend is running and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="font-display text-3xl text-forest-dark mb-2">Delivery details</h1>
      <p className="text-ink/60 mb-8">
        Order total <span className="font-medium text-forest-dark">₹{total}</span> — the
        nursery is notified the moment you place this order.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink/80">Full name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-forest/20 rounded-lg px-4 py-2.5 outline-none focus:border-forest"
            placeholder="Your name"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink/80">Phone number</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border border-forest/20 rounded-lg px-4 py-2.5 outline-none focus:border-forest"
            placeholder="10-digit mobile number"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink/80">Delivery address</span>
          <textarea
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border border-forest/20 rounded-lg px-4 py-2.5 outline-none focus:border-forest min-h-24"
            placeholder="Flat, street, area, city, PIN"
          />
        </label>

        {error && <p className="text-clay-dark text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-clay text-paper px-6 py-3 rounded-full font-medium hover:bg-clay-dark transition-colors disabled:opacity-60"
        >
          {submitting ? "Placing order…" : `Place order — ₹${total}`}
        </button>
      </form>
    </div>
  );
}
