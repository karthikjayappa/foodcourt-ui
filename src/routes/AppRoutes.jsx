import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Vendors from "../pages/Vendors";
import VendorDetails from "../pages/VendorDetails";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;