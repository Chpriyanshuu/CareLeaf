import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Storefront from "./pages/Storefront";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import CareGuide from "./pages/CareGuide";
import NurseryDashboard from "./pages/NurseryDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-body">
      <Navbar />
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/care-guide/:plantId" element={<CareGuide />} />
        <Route path="/nursery" element={<NurseryDashboard />} />
      </Routes>
    </div>
  );
}
