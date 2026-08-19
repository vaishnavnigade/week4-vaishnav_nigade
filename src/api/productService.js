
import axiosClient from "./axiosClient";

// GET /products — returns the full catalogue (filtered client-side for search).
export const getProducts = () =>
  axiosClient.get("/products").then((res) => res.data);

// GET /products/{product_id} — detailed info for a single product.
export const getProductById = (productId) =>
  axiosClient.get(`/products/${productId}`).then((res) => res.data);
