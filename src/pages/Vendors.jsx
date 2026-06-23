import React, { useState } from "react";
import vendors from "../data/vendors";
import VendorCard from "../components/vendor/VendorCard";

const Vendors = () => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", ...new Set(vendors.map((v) => v.category))];

  const filteredVendors = vendors
    .filter((vendor) => {
      const categoryMatch =
        filterCategory === "All" ||
        vendor.category === filterCategory;

      const searchMatch = vendor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch && vendor.isActive;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "location":
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("All");
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* Left */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Food Court Vendors
              </h1>

              <p className="text-gray-500 mt-1">
                Discover and order from your favorite food stalls
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-gray-400">Total Vendors</p>
                <p className="font-bold text-lg">
                  {vendors.length}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Showing</p>
                <p className="font-bold text-lg">
                  {filteredVendors.length}
                </p>
              </div>
            </div>

          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">

            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:border-black outline-none"
              />

              <span className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </span>
            </div>

            {/* Category */}
            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="name">
                Name (A-Z)
              </option>

              <option value="rating">
                Rating (High-Low)
              </option>

              <option value="location">
                Location
              </option>
            </select>

            {/* Clear Button */}
            <button
              onClick={clearFilters}
              className="px-5 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
            >
              Clear
            </button>

          </div>

          {/* Active Filters */}
          {(searchTerm || filterCategory !== "All") && (
            <div className="flex flex-wrap gap-2 mt-4">

              {searchTerm && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  Search: {searchTerm}
                </span>
              )}

              {filterCategory !== "All" && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                  Category: {filterCategory}
                </span>
              )}

            </div>
          )}

        </div>
      </div>

      {/* Vendor Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
              />
            ))}

          </div>
        ) : (
          <div className="text-center py-20">

            <div className="text-6xl mb-4">
              🍽️
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Vendors Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filter.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 bg-black text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Reset Filters
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default Vendors;