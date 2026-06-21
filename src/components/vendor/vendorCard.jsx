import React from "react";
import { useNavigate } from "react-router-dom";

const VendorCard = ({ vendor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 hover:border-black transition-all duration-300 group">

      {/* HEADER */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-[#E50010] transition-colors">
          {vendor.name}
        </h2>

        <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
          {vendor.category}
        </p>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-4">

        {/* Rating + Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            ⭐ {vendor.rating.toFixed(1)}
          </span>

          {vendor.isActive && (
            <span className="text-xs uppercase tracking-widest border border-gray-300 px-2 py-1 text-gray-700">
              Open
            </span>
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="text-gray-400">Location:</span>{" "}
            {vendor.location} ({vendor.stallNumber})
          </p>

          <p>
            <span className="text-gray-400">Hours:</span>{" "}
            {vendor.openingHours}
          </p>

          <p>
            <span className="text-gray-400">Contact:</span>{" "}
            {vendor.phone}
          </p>
        </div>

        {/* CUISINE */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {vendor.cuisine.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="text-xs border border-gray-200 px-2 py-1 text-gray-600 uppercase tracking-wide hover:border-black hover:text-black transition"
              >
                {item}
              </span>
            ))}

            {vendor.cuisine.length > 3 && (
              <span className="text-xs border border-gray-200 px-2 py-1 text-gray-500">
                +{vendor.cuisine.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-100 bg-white">

        <button
          onClick={() => navigate(`/vendor/${vendor.id}`)}
          className="w-full border border-black text-black py-2 text-sm uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all"
        >
          View Menu
        </button>

      </div>
    </div>
  );
};

export default VendorCard;