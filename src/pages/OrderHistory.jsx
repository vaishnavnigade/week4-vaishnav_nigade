
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../api/orderService";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch only the logged-in user's orders (server scopes by token).
  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>; // required empty state

  return (
    <section className="order-history">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order #</th><th>Date</th><th>Total</th>
            <th>Status</th><th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{new Date(o.created_at).toLocaleDateString()}</td>
              <td>₹{parseFloat(o.total_amount).toFixed(2)}</td>
              <td>{o.status}</td>
              <td><Link to={`/orders/${o.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default OrderHistory;
