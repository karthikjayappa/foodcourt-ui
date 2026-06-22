import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, getTotalPrice, clearCart } =
    useContext(CartContext);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    tableNumber: "",
    paymentMethod: "UPI",
  });

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (
      !formData.customerName.trim() ||
      !formData.phone.trim() ||
      !formData.tableNumber.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const orderData = {
      id: `ORD${Date.now()}`,

      vendor:
        cart.length > 0
          ? cart[0].vendorName || "Food Court"
          : "Food Court",

      // FIXED ITEMS FORMAT
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),

      customerName: formData.customerName,
      phone: formData.phone,
      tableNumber: formData.tableNumber,
      paymentMethod: formData.paymentMethod,

      subtotal,
      tax,
      total,

      status: "Preparing",

      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, orderData])
    );

    console.log("Order Saved:", orderData);

    alert("Order Placed Successfully!");

    clearCart();

    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">
            Cart is Empty
          </h1>

          <p className="text-gray-500">
            Add items before checkout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Customer Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Customer Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3"
            />

            <input
              type="text"
              name="tableNumber"
              placeholder="Table Number"
              value={formData.tableNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3"
            />

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3"
            >
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-6 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-8 bg-black text-white py-3 rounded hover:bg-red-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;