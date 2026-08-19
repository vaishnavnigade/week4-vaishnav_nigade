
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getCategoryById } from "../api/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getProductById(id)
      .then(async (p) => {
        setProduct(p);
        if (p.category_id) {
          const c = await getCategoryById(p.category_id).catch(() => null);
          if (c) setCategory(c.name);
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="error-text">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <article className="product-details">
      <h2>{product.name}</h2>
      <p className="category">Category: {category || "Uncategorised"}</p>
      <p className="price">Price: ₹{parseFloat(product.price).toFixed(2)}</p>
      <p>{product.description}</p>
      <p>{product.stock > 0 ? `In stock: ${product.stock}` : "Out of Stock"}</p>
    </article>
  );
};

export default ProductDetails;
