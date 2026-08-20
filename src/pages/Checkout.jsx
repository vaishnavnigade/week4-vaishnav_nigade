import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { checkout } from "../api/orderService";
import Button from "../components/common/Button";

const Checkout = () => {
  const { items, totalAmount, refreshCart } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState("COD"); // "COD" | "CARD"
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateCard = () => {
    const numOk = /^\d{16}$/.test(card.number.replace(/\s/g, ""));
    const expOk = /^\d{2}\/\d{2}$/.test(card.expiry);
    const cvvOk = /^\d{3}$/.test(card.cvv);
    if (!numOk) return "Card number must be 16 digits.";
    if (!expOk) return "Expiry must be in MM/YY format.";
    if (!cvvOk) return "CVV must be 3 digits.";
    return "";
  };

  const handlePlaceOrder = async () => {
    setError("");

    // Credit Card: validate dummy details on the frontend (no payment API call).
    if (method === "CARD") {
      const cardError = validateCard();
      if (cardError) {
        setError(cardError);
        return;
      }
    }

    setLoading(true);
    try {
      // Create the order from the server-side cart (works for COD and CARD).
      const order = await checkout();
      await refreshCart();
      navigate(`/orders/${order.id}`, { state: { justPlaced: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCard = (field) => (e) =>
    setCard({ ...card, [field]: e.target.value });

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

      {method === "CARD" && (
        <div className="card-details" style={{ display: "grid", gap: ".6rem", margin: "1rem 0" }}>
          <input type="text" placeholder="Card Number (16 digits)"
            value={card.number} onChange={updateCard("number")} />
          <input type="text" placeholder="Expiry (MM/YY)"
            value={card.expiry} onChange={updateCard("expiry")} />
          <input type="text" placeholder="CVV (3 digits)"
            value={card.cvv} onChange={updateCard("cvv")} />
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      <Button onClick={handlePlaceOrder} loading={loading}>
        Place Order
      </Button>
    </section>
  );
};

export default Checkout;
