import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#222",
        color: "white",
        display: "flex",
        gap: "1rem",
      }}
    >
      <h2>Food Court</h2>

      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>

      <Link to="/vendors" style={{ color: "white" }}>
        Vendors
      </Link>

      <Link to="/cart" style={{ color: "white" }}>
        Cart
      </Link>

      <Link to="/orders" style={{ color: "white" }}>
        Orders
      </Link>
    </nav>
  );
}

export default Navbar;