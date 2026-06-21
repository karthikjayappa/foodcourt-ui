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

  // Find vendor
  const vendor = vendors.find((v) => v.id === parseInt(vendorId));

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Vendor Not Found
          </h2>
          <button
            onClick={() => navigate("/vendors")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Vendors
          </button>
        </div>
      </div>
    );
  }

  // Get vendor's menu items
  const vendorMenu = menuItems.filter((item) => item.vendorId === vendor.id);
  const categories = [
    "All",
    ...new Set(vendorMenu.map((item) => item.category)),
  ];

  // Filter items by category
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
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/vendors")}
            className="flex items-center text-orange-600 hover:text-orange-700 font-semibold"
          >
            ← Back to Vendors
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
          <div className="w-32"></div>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
          <div className="flex flex-wrap gap-6 text-orange-50">
            <div>
              <p className="text-sm opacity-90">Category</p>
              <p className="text-lg font-semibold">{vendor.category}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Rating</p>
              <p className="text-lg font-semibold">⭐ {vendor.rating}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Location</p>
              <p className="text-lg font-semibold">
                {vendor.location} - {vendor.stallNumber}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-90">Hours</p>
              <p className="text-lg font-semibold">{vendor.openingHours}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Contact</p>
              <p className="text-lg font-semibold">{vendor.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
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
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No items available in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Menu Item Component
const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Item Image Placeholder */}
      <div className="bg-gradient-to-br from-orange-100 to-orange-50 h-40 flex items-center justify-center text-5xl">
        {item.emoji || "🍽️"}
      </div>

      {/* Item Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <p className="text-xs text-gray-500 font-medium">{item.category}</p>
        </div>

        <p className="text-sm text-gray-600">{item.description}</p>

        {/* Rating & Availability */}
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-semibold">
            {item.rating ? `⭐ ${item.rating}` : "New"}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              item.available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.available ? "Available" : "Out of Stock"}
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-2xl font-bold text-orange-600">
            ₹{item.price}
          </span>
          <button
            onClick={onAddToCart}
            disabled={!item.available}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;