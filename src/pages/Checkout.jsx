
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { checkout } from "../api/orderService";
import { processPayment } from "../api/paymentService";
import Button from "../components/common/Button";

const Checkout = () => {
  const { items, totalAmount, refreshCart } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState("COD"); // "COD" | "CARD"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    setError("");
    setLoading(true);
    try {
      // 1. Create the order from the server-side cart (returns order.id, total_amount).
      const order = await checkout();

      // 2. Credit Card: charge the returned total via the payment service.
      if (method === "CARD") {
        const amountCents = Math.round(parseFloat(order.total_amount) * 100);
        // NOTE: replace this placeholder with a real gateway token if available.
        await processPayment(amountCents, "tok_demo_card");
      }

      // 3. Refresh the (now empty) cart and show confirmation.
      await refreshCart();
      navigate(`/orders/${order.id}`, { state: { justPlaced: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0)
    return <p>Your cart is empty. Add items before checking out.</p>;

  return (
    <section className="checkout-page">
      <h2>Review Your Order</h2>

      <ul className="checkout-items">
        {items.map((i) => (
          <li key={i.id}>
            {i.name} × {i.quantity} — ₹{(i.price * i.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <p className="checkout-total">Total: ₹{totalAmount.toFixed(2)}</p>

      <fieldset className="payment-methods">
        <legend>Payment Method</legend>
        <label>
          <input type="radio" name="method" value="COD"
            checked={method === "COD"} onChange={(e) => setMethod(e.target.value)} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" name="method" value="CARD"
            checked={method === "CARD"} onChange={(e) => setMethod(e.target.value)} />
          Credit Card
        </label>
      </fieldset>

      {error && <p className="error-text">{error}</p>}

      <Button onClick={handlePlaceOrder} loading={loading}>
        Place Order
      </Button>
    </section>
  );
};

export default Checkout;
