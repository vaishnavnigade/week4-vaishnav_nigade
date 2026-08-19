
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";

// Small helper to avoid repeating the ProtectedRoute wrapper for every page.
const Protected = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

const App = () => (
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/products" element={<Protected><ProductListing /></Protected>} />
            <Route path="/products/:id" element={<Protected><ProductDetails /></Protected>} />
            <Route path="/cart" element={<Protected><Cart /></Protected>} />
            <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
            <Route path="/orders" element={<Protected><OrderHistory /></Protected>} />
            <Route path="/orders/:id" element={<Protected><OrderDetails /></Protected>} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);

export default App;
