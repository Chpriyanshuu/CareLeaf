import type { Plant } from "../types";
import { useCart } from "../CartContext";

export default function PlantCard({ plant }: { plant: Plant }) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col bg-white border border-forest/10 rounded-2xl overflow-hidden hover:border-forest/30 transition-colors">
      <div className="h-40 bg-sage flex items-center justify-center text-6xl">
        {plant.emoji}
      </div>
      <div className="flex flex-col flex-1 p-5 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-forest-dark leading-snug">{plant.name}</h3>
          <span className="shrink-0 text-xs uppercase tracking-wide text-forest/70 bg-sage px-2 py-1 rounded-full">
            {plant.difficulty}
          </span>
        </div>
        <p className="text-sm text-ink/70 flex-1">{plant.short_desc}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-lg text-clay-dark">₹{plant.price}</span>
          <button
            onClick={() => addToCart(plant)}
            className="text-sm font-medium bg-forest text-paper px-4 py-2 rounded-full hover:bg-forest-dark transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
