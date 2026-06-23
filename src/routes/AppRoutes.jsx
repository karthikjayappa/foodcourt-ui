import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Vendors from "../pages/Vendors.jsx";
import VendorDetails from "../pages/VendorDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Orders from "../pages/Orders.jsx";
import Checkout from "../pages/Checkout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/vendor/:vendorId" element={<VendorDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default AppRoutes;