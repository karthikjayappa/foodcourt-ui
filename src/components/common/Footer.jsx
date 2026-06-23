import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              FOOD COURT
            </h2>

            <p className="text-gray-400 text-sm">
              Order food from your favorite vendors
              quickly and easily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>Home</li>
              <li>Vendors</li>
              <li>Cart</li>
              <li>Orders</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p className="text-sm text-gray-400">
              support@foodcourt.com
            </p>

            <p className="text-sm text-gray-400">
              +91 9876543210
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-sm text-gray-500">
          © 2026 Food Court Management System
        </div>

      </div>
    </footer>
  );
};

export default Footer;