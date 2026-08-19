
import { Link } from "react-router-dom";
import Button from "../common/Button";

// Reusable card: shows required details and disables Add to Cart when stock <= 0.
const ProductCard = ({ product, onAddToCart }) => {
  const inStock = product.quantity > 0; // stock rule per case study

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="price">₹{product.price}</p>

      {inStock ? (
        <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
      ) : (
        <span className="out-of-stock">Out of Stock</span>
      )}

      <Link to={`/products/${product.id}`} className="details-link">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
