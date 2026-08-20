
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-col">
        <h4>ShopEasy</h4>
        <p>Your one-stop online shopping app.</p>
      </div>
      <div className="footer-col">
        <h4>Shop</h4>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">My Orders</Link>
      </div>
      <div className="footer-col">
        <h4>Account</h4>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
    <div className="footer-bottom">
      © {new Date().getFullYear()} ShopEasy. All rights reserved.
    </div>
  </footer>
);

export default Footer;
