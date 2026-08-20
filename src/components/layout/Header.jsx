
import { Link, NavLink } from "react-router-dom";

// Pass your real auth state + cart count as props (or read from context).
const Header = ({ isLoggedIn = false, cartCount = 0, onLogout }) => {
  const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">🛒 ShopEasy</Link>

        <nav className="main-nav">
          <NavLink to="/" className={navClass} end>Home</NavLink>
          <NavLink to="/products" className={navClass}>Products</NavLink>
          <NavLink to="/orders" className={navClass}>My Orders</NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-link">
            Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <button className="auth-btn" onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login" className="auth-btn">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
