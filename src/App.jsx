import { CartProvider } from "./contexts/CartContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        <Navbar />
        <AppRoutes />
      </div>
    </CartProvider>
  );
}

export default App;