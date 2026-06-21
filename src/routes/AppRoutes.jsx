import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Vendors from "../pages/Vendors";
import VendorDetails from "../pages/VendorDetails";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/vendor/:vendorId" element={<VendorDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default AppRoutes;