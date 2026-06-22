import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders.reverse());
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">
          My Orders
        </h1>

        <p className="text-gray-500">
          No orders placed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Track all your food orders.
        </p>
      </div>

      {/* Orders */}
      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >

            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">

              <div>
                <h2 className="text-xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-sm text-gray-500">
                  {order.date}
                </p>
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Ready"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>

            </div>

            {/* Customer Information */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Customer
                </p>

                <p className="font-semibold">
                  {order.customerName}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Phone
                </p>

                <p className="font-semibold">
                  {order.phone}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Table Number
                </p>

                <p className="font-semibold">
                  {order.tableNumber}
                </p>
              </div>

            </div>

            {/* Vendor */}
            <div className="mb-5">
              <p className="text-gray-500 text-sm">
                Vendor
              </p>

              <p className="font-semibold">
                {order.vendor}
              </p>
            </div>

            {/* Ordered Items */}
            <div className="border-t pt-4">

              <h3 className="font-semibold mb-3">
                Ordered Items
              </h3>

              <div className="space-y-2">

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* Payment Method */}
            <div className="border-t mt-5 pt-4 flex justify-between">

              <span className="font-semibold">
                Payment Method
              </span>

              <span>
                {order.paymentMethod}
              </span>

            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4">

              <span className="text-lg font-bold">
                Total Amount
              </span>

              <span className="text-xl font-bold text-red-600">
                ₹{order.total.toFixed(2)}
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Orders;