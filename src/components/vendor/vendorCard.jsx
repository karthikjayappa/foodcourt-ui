import React from "react";
import { useNavigate } from "react-router-dom";

const VendorCard = ({ vendor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-400">
      {/* Card Header with Category Badge */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {vendor.name}
        </h2>
        <span className="inline-block bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {vendor.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Rating & Status */}
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-bold text-lg">
            ⭐ {vendor.rating.toFixed(1)}
          </span>
          {vendor.isActive && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
              Open Now
            </span>
          )}
        </div>

        {/* Location & Details */}
        <div className="space-y-1 text-sm text-gray-700">
          <p>
            📍 <span className="font-medium">{vendor.location}</span> (
            {vendor.stallNumber})
          </p>
          <p>
            🕒 <span className="font-medium">{vendor.openingHours}</span>
          </p>
          <p>
            📞 <span className="font-medium">{vendor.phone}</span>
          </p>
        </div>

        {/* Cuisine Tags */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            Specialties:
          </p>
          <div className="flex flex-wrap gap-2">
            {vendor.cuisine.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors"
              >
                {item}
              </span>
            ))}
            {vendor.cuisine.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-medium">
                +{vendor.cuisine.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <button
          onClick={() => navigate(`/vendor/${vendor.id}`)}
          className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white py-2.5 rounded-lg transition-all font-semibold text-sm shadow-sm hover:shadow-md"
        >
          View Menu →
        </button>
      </div>
    </div>
  );
};

export default VendorCard;