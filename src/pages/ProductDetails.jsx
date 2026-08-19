
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductById(id).then(setProduct).catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="error-text">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <article className="product-details">
      <h2>{product.name}</h2>
      <p className="category">Category: {product.category}</p>
      <p className="price">Price: ₹{product.price}</p>
      <p>{product.description}</p>
      <p>{product.quantity > 0 ? `In stock: ${product.quantity}` : "Out of Stock"}</p>
    </article>
  );
};

export default ProductDetails;
