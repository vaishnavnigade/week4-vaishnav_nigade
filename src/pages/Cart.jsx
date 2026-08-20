
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/cart/CartItemRow";
import Button from "../components/common/Button";

const Cart = () => {
  const { items, loading, error, totalAmount, itemCount, remove, updateQuantity } =
    useCart();
  const navigate = useNavigate();

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th><th>Price</th><th>Quantity</th>
                <th>Subtotal</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdate={updateQuantity}
                  onRemove={remove}
                />
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p>Items: {itemCount}</p>
            <p>Total: ₹{totalAmount.toFixed(2)}</p>
          </div>

          <Button disabled={items.length === 0} onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </section>
  );
};

export default Cart;
