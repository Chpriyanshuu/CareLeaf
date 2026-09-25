import { Link, useLocation } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-forest/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl text-forest-dark">
          <span className="text-2xl">🌿</span>
          <span>PlantUp</span>
        </Link>

        <nav className="flex items-center gap-6 font-body text-sm text-ink/80">
          <Link
            to="/"
            className={isActive("/") ? "text-forest-dark font-medium" : "hover:text-forest-dark transition-colors"}
          >
            Shop
          </Link>
          <Link
            to="/nursery"
            className={isActive("/nursery") ? "text-forest-dark font-medium" : "hover:text-forest-dark transition-colors"}
          >
            Nursery view
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 rounded-full bg-forest text-paper px-4 py-2 hover:bg-forest-dark transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-clay text-xs font-semibold">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
