import React from "react";

const orders = [
  {
    id: "ORD001",
    vendor: "Spice Junction",
    items: ["Masala Dosa", "Filter Coffee"],
    total: 180,
    status: "Preparing",
    date: "22 Jun 2026",
  },
  {
    id: "ORD002",
    vendor: "Burger Hub",
    items: ["Chicken Burger", "French Fries"],
    total: 320,
    status: "Ready",
    date: "21 Jun 2026",
  },
  {
    id: "ORD003",
    vendor: "Pizza Corner",
    items: ["Margherita Pizza"],
    total: 299,
    status: "Delivered",
    date: "20 Jun 2026",
  },
];

const Orders = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";

      case "Ready":
        return "bg-green-100 text-green-700 border-green-300";

      case "Delivered":
        return "bg-blue-100 text-blue-700 border-blue-300";

      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Track your recent food orders.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
          >
            {/* Top Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold">
                  {order.id}
                </h2>

                <p className="text-gray-500 text-sm">
                  {order.date}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm font-semibold border rounded-full w-fit ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Vendor */}
            <div className="mt-5">
              <p className="text-sm text-gray-500 uppercase">
                Vendor
              </p>

              <p className="font-semibold text-gray-900">
                {order.vendor}
              </p>
            </div>

            {/* Items */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 uppercase mb-2">
                Items
              </p>

              <div className="flex flex-wrap gap-2">
                {order.items.map((item, index) => (
                  <span
                    key={index}
                    className="border border-gray-300 px-3 py-1 rounded text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-gray-600">
                Total Amount
              </span>

              <span className="text-xl font-bold text-gray-900">
                ₹{order.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;