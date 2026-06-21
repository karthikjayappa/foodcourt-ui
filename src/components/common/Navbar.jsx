import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import logo from "../../assets/logo1.png"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Removed the Cart object from here
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Vendors", path: "/vendors" },
    { label: "Orders", path: "/orders" },
  ];

  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 tracking-wide uppercase text-sm ${
      isActive
        ? "text-[#E50010] font-semibold"
        : "text-gray-900 hover:text-[#E50010]"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-black tracking-widest"
          >
            <img src={logo} alt="Food Court" className="h-8 w-8 object-contain" />
            <span>FOOD COURT</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClasses}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">

            {/* Cart Icon */}
            <NavLink
              to="/cart"
              className="text-gray-900 hover:text-[#E50010] transition-colors"
            >
              <FiShoppingCart size={22} />
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  to={item.path}
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