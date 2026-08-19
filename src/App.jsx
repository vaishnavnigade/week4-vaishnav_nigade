
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected: product browsing requires authentication */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
