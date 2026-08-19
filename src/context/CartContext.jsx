
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../api/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch cart from the server; used on login and after every mutation.
  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setItems(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load the cart whenever the user becomes authenticated; clear on logout.
  useEffect(() => {
    if (isAuthenticated) refreshCart();
    else setItems([]);
  }, [isAuthenticated, refreshCart]);

  // Add a product, then re-sync so totals/count reflect the server truth.
  const add = async (productId, quantity = 1) => {
    await addToCart(productId, quantity);
    await refreshCart();
  };

  // Remove a line by its cart_item_id.
  const remove = async (cartItemId) => {
    await removeFromCart(cartItemId);
    await refreshCart();
  };

  // Update quantity via the dedicated PUT endpoint (single, atomic call).
  // productId is accepted to preserve the caller signature; add it to the
  // payload in cartService if your backend requires it.
  const updateQuantity = async (cartItemId, productId, newQuantity) => {
    await updateCartItem(cartItemId, newQuantity);
    await refreshCart();
  };

  // Derived values (item count for header badge, grand total for summary).
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = {
    items, loading, error, itemCount, totalAmount,
    add, remove, updateQuantity, refreshCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

const normalizeItem = (raw) => {
  const product = raw.product || {};
  return {
    id: raw.id, // cart_item_id
    product_id: product.id ?? raw.product_id,
    name: product.name ?? raw.name,
    price: parseFloat(product.price ?? raw.price ?? 0),
    stock: product.stock ?? raw.stock,
    quantity: raw.quantity,
  };
};

// Replace the body of refreshCart with:
const refreshCart = useCallback(async () => {
  setLoading(true);
  try {
    const data = await getCart();
    setItems(data.map(normalizeItem)); // normalise every line
    setError("");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, []);
