
// Import each local image so Vite bundles + hashes it correctly.
import img1 from "../assets/products/1.jpg";
import img2 from "../assets/products/2.jpg";
import img3 from "../assets/products/3.jpg";
import img4 from "../assets/products/4.jpg";
import img5 from "../assets/products/5.jpg";
import img6 from "../assets/products/6.jpg";
import img7 from "../assets/products/7.jpg";
import img8 from "../assets/products/8.jpg";
import img9 from "../assets/products/9.jpg";
import img10 from "../assets/products/10.jpg";

// Keys = your REAL product ids from GET /products. Change if not 1–10.
const IMAGE_MAP = {
  1: img1, 2: img2, 3: img3, 4: img4, 5: img5,
  6: img6, 7: img7, 8: img8, 9: img9, 10: img10,
};

const FALLBACK = "https://placehold.co/400x300?text=No+Image";

// Priority: backend image_url (future) → local map by id → fallback.
export const getProductImage = (product) =>
  product?.image_url || IMAGE_MAP[product?.id] || FALLBACK;
