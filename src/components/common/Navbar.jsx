import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Vendors", path: "/vendors" },
    { label: "Cart", path: "/cart" },
    { label: "Orders", path: "/orders" },
  ];

  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-orange-500 font-semibold"
        : "text-gray-700 hover:text-orange-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-orange-500"
          >
            <FaUtensils />
            <span>Food Court</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={linkClasses}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Cart Icon + Mobile Menu */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/cart"
              className="relative text-gray-700 hover:text-orange-500 transition-colors"
            >
              <FiShoppingCart size={22} />
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={linkClasses}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;