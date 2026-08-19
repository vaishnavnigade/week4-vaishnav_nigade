
import axiosClient from "./axiosClient";

// POST /orders/checkout — no body; builds the order from the server-side cart.
export const checkout = () =>
  axiosClient.post("/orders/checkout").then((res) => res.data);

// GET /orders/me — order history for the logged-in user.
export const getMyOrders = () =>
  axiosClient.get("/orders/me").then((res) => res.data);

// GET /orders/{order_id} — full details for a single order.
export const getOrderById = (orderId) =>
  axiosClient.get(`/orders/${orderId}`).then((res) => res.data);
