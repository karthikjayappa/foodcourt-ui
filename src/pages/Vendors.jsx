import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import vendors from "../data/vendors";
import VendorCard from "../components/vendor/VendorCard";


const Vendors = () => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");


  const categories = ["All", ...new Set(vendors.map((v) => v.category))];


  const filteredVendors = vendors
    .filter((vendor) => {
      const categoryMatch =
        filterCategory === "All" || vendor.category === filterCategory;


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


  return (
    <div className="min-h-screen bg-gray-50">


      {/* HEADER + FILTERS IN SAME ROW */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          
          {/* TOP ROW: Title + Search + Category + Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            
            {/* TITLE */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 uppercase">
                Food Court
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                {filteredVendors.length} active vendors available
              </p>
            </div>


            {/* SEARCH + CATEGORY + SORT */}
            <div className="flex flex-col sm:flex-row gap-3">
              
              {/* SEARCH */}
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 focus:border-black outline-none transition text-sm w-full sm:w-48"
              />


              {/* CATEGORY */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 focus:border-black outline-none text-sm w-full sm:w-36"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>


              {/* SORT */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 focus:border-black outline-none text-sm w-full sm:w-36"
              >
                <option value="name">NAME (A–Z)</option>
                <option value="rating">RATING (HIGH–LOW)</option>
                <option value="location">LOCATION</option>
              </select>
            </div>
          </div>
        </div>
      </div>


      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 uppercase tracking-widest">
              No vendors found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


export default Vendors;