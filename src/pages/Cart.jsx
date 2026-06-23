import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useContext(CartContext);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🛒</div>

        <h1 className="text-3xl font-bold mb-2">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mb-6">
          Browse vendors and add delicious food.
        </p>

        <Link
          to="/vendors"
          className="bg-black text-white px-6 py-3 rounded hover:bg-red-600 transition"
        >
          Explore Vendors
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Your Cart
        </h1>

        <p className="text-gray-500 mt-2">
          Review your selected items
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="flex justify-between items-start">

                {/* Item Details */}
                <div>
                  <h3 className="text-xl font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.vendorName}
                  </p>

                  <p className="mt-2 font-bold text-lg">
                    ₹{item.price}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.error(`${item.name} removed from cart`);
                  }}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>

              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-5">

                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

                {/* Item Total */}
                <div className="font-bold text-lg">
                  ₹{item.price * item.quantity}
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Order Summary */}
        <div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-3 rounded hover:bg-red-600 transition"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
                className="w-full border border-red-500 text-red-500 py-3 rounded hover:bg-red-50 transition"
              >
                Clear Cart
              </button>

              <Link
                to="/vendors"
                className="block text-center border py-3 rounded hover:bg-gray-50"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;