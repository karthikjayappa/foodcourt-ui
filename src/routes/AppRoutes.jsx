import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";

import Home from "../pages/Home";
import Vendors from "../pages/Vendors";
import VendorDetails from "../pages/VendorDetails";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;