import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Cart() {
  const { lines, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-5xl mb-4">🪴</p>
        <h1 className="font-display text-2xl text-forest-dark mb-2">Your cart is empty</h1>
        <p className="text-ink/60 mb-6">Nothing here yet — go find a plant that suits your space.</p>
        <Link
          to="/"
          className="inline-block bg-forest text-paper px-6 py-3 rounded-full font-medium hover:bg-forest-dark transition-colors"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl text-forest-dark mb-8">Your cart</h1>

      <div className="flex flex-col gap-4 mb-8">
        {lines.map(({ plant, quantity }) => (
          <div
            key={plant.id}
            className="flex items-center gap-4 bg-white border border-forest/10 rounded-xl p-4"
          >
            <div className="w-14 h-14 rounded-lg bg-sage flex items-center justify-center text-2xl shrink-0">
              {plant.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-forest-dark truncate">{plant.name}</p>
              <p className="text-sm text-ink/60">₹{plant.price} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(plant.id, quantity - 1)}
                className="w-8 h-8 rounded-full border border-forest/20 text-forest-dark hover:bg-sage"
                aria-label={`Decrease quantity of ${plant.name}`}
              >
                −
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => updateQuantity(plant.id, quantity + 1)}
                className="w-8 h-8 rounded-full border border-forest/20 text-forest-dark hover:bg-sage"
                aria-label={`Increase quantity of ${plant.name}`}
              >
                +
              </button>
            </div>
            <p className="w-16 text-right font-medium text-forest-dark">
              ₹{plant.price * quantity}
            </p>
            <button
              onClick={() => removeFromCart(plant.id)}
              className="text-ink/40 hover:text-clay-dark text-sm"
              aria-label={`Remove ${plant.name} from cart`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-forest/10 pt-6">
        <div>
          <p className="text-sm text-ink/60">Total</p>
          <p className="font-display text-2xl text-forest-dark">₹{total}</p>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-clay text-paper px-6 py-3 rounded-full font-medium hover:bg-clay-dark transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
