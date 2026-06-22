import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vendors from "../data/vendors";
import menuItems from "../data/menuItems";
import { CartContext } from "../contexts/CartContext";

const VendorDetails = () => {
  // FIX 1: Match route param name
  const { vendorId } = useParams();

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const vendor = vendors.find(
    (vendor) => vendor.id === Number(vendorId)
  );

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vendor Not Found
          </h2>

          <button
            onClick={() => navigate("/vendors")}
            className="bg-black hover:bg-gray-900 text-white px-6 py-2 rounded"
          >
            Back to Vendors
          </button>
        </div>
      </div>
    );
  }

  const vendorMenu = menuItems.filter(
    (item) => item.vendorId === vendor.id
  );

  const categories = [
    "All",
    ...new Set(vendorMenu.map((item) => item.category)),
  ];

  const filteredItems = vendorMenu.filter(
    (item) =>
      selectedCategory === "All" ||
      item.category === selectedCategory
  );

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      vendorName: vendor.name,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/vendors")}
            className="text-black hover:text-red-600 font-semibold transition-colors"
          >
            ← Back
          </button>

          <h1 className="text-lg font-bold tracking-widest uppercase">
            Menu
          </h1>

          <div className="w-20" />
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-gray-900">
            {vendor.name}
          </h1>

          {/* NEW: Vendor Stats */}
          <div className="flex flex-wrap gap-8 mt-5">

            <div>
              <p className="text-xs uppercase text-gray-400">
                Category
              </p>
              <p className="font-semibold">
                {vendor.category}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Rating
              </p>
              <p className="font-semibold">
                ⭐ {vendor.rating}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Menu Items
              </p>
              <p className="font-semibold">
                {vendorMenu.length}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Location
              </p>
              <p className="font-semibold">
                {vendor.location} • {vendor.stallNumber}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Hours
              </p>
              <p className="font-semibold">
                {vendor.openingHours}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Contact
              </p>
              <p className="font-semibold">
                {vendor.phone}
              </p>
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
                  : "bg-white text-gray-800 border-gray-300 hover:border-red-600 hover:text-red-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
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
          <div className="text-center py-12 text-gray-500">
            No items available
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= MENU ITEM ================= */

const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">

      <div className="h-40 bg-gray-100 flex items-center justify-center text-5xl">
        {item.emoji || "🍽️"}
      </div>

      <div className="p-4">

        <h3 className="text-lg font-bold text-gray-900">
          {item.name}
        </h3>

        <p className="text-xs uppercase tracking-wide text-gray-400 mt-1">
          {item.category}
        </p>

        <p className="text-sm text-gray-600 mt-3">
          {item.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold">
            {item.rating ? `⭐ ${item.rating}` : "New"}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded border ${
              item.available
                ? "border-green-300 text-green-700"
                : "border-red-300 text-red-600"
            }`}
          >
            {item.available ? "Available" : "Out of Stock"}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-xl font-bold">
            ₹{item.price}
          </span>

          <button
            onClick={onAddToCart}
            disabled={!item.available}
            className="bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-600 disabled:bg-gray-300 transition-colors"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default VendorDetails;