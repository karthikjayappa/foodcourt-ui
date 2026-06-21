import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const CustomerLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} Food Court. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;