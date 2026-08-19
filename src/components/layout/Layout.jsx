
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Shared page shell: Header (brand + nav + profile) and Footer wrap all pages.
const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/products" className="brand">ABC Shop</Link>
        <nav>
          <Link to="/products">Products</Link>
          {isAuthenticated && <Link to="/cart">Cart</Link>}
          {isAuthenticated && <Link to="/orders">Orders</Link>}
        </nav>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <p>© 2026 ABC Organization. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
