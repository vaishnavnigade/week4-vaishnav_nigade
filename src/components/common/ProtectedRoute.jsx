
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Redirects to /login when there is no valid token (secures product/cart/orders).
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
