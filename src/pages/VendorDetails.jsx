import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vendors from "../data/vendors";
import menuItems from "../data/menuItems";
import { CartContext } from "../contexts/CartContext";

const VendorDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const vendor = vendors.find((v) => v.id === parseInt(vendorId));

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vendor Not Found
          </h2>
          <button
            onClick={() => navigate("/vendors")}
            className="bg-black hover:bg-gray-900 text-white px-6 py-2"
          >
            Back to Vendors
          </button>
        </div>
      </div>
    );
  }

  const vendorMenu = menuItems.filter((item) => item.vendorId === vendor.id);
  const categories = ["All", ...new Set(vendorMenu.map((item) => item.category))];

  const filteredItems = vendorMenu.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      vendorId: vendor.id,
      vendorName: vendor.name,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/vendors")}
            className="text-black hover:text-[#E50010] font-semibold transition-colors"
          >
            ← Back
          </button>

          <h1 className="text-lg font-bold tracking-widest text-gray-900 uppercase">
            Menu
          </h1>

          <div className="w-20"></div>
        </div>
      </div>

      
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {vendor.name}
          </h1>

          <div className="flex flex-wrap gap-8 mt-4 text-sm text-gray-700">
            <div>
              <p className="text-gray-400 uppercase text-xs">Category</p>
              <p className="font-semibold">{vendor.category}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Rating</p>
              <p className="font-semibold">⭐ {vendor.rating}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Location</p>
              <p className="font-semibold">
                {vendor.location} - {vendor.stallNumber}
              </p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Hours</p>
              <p className="font-semibold">{vendor.openingHours}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase text-xs">Contact</p>
              <p className="font-semibold">{vendor.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 border text-sm font-semibold uppercase tracking-wide transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 border-gray-300 hover:border-[#E50010] hover:text-[#E50010]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No items available
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------------- MENU ITEM ---------------- */

const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-200 hover:border-gray-400 transition-all">
      
      {/* Image */}
      <div className="h-40 flex items-center justify-center text-5xl bg-gray-50">
        {item.emoji || "🍽️"}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>

        <p className="text-xs uppercase tracking-wide text-gray-400">
          {item.category}
        </p>

        <p className="text-sm text-gray-600">{item.description}</p>

        {/* Status */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-900 font-semibold">
            {item.rating ? `⭐ ${item.rating}` : "New"}
          </span>

          <span
            className={`text-xs border px-2 py-1 uppercase tracking-wide ${
              item.available
                ? "border-gray-300 text-gray-700"
                : "border-red-300 text-[#E50010]"
            }`}
          >
            {item.available ? "Available" : "Out of stock"}
          </span>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t pt-3 border-gray-200">
          <span className="text-xl font-bold text-gray-900">
            ₹{item.price}
          </span>

          <button
            onClick={onAddToCart}
            disabled={!item.available}
            className="bg-black text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-[#E50010] disabled:bg-gray-300 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;