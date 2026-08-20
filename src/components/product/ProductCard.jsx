
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { getProductImage } from "../../utils/productImage"; // <-- ADDED

// Reusable card; uses `stock` and a resolved category name (categoryName prop).
const ProductCard = ({ product, categoryName, onAddToCart }) => {
  const inStock = product.stock > 0; // actual stock field is `stock`

  return (
    <div className="product-card">
      {/* ADDED: product image */}
      <div className="product-image">
        <img
          src={getProductImage(product)}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/400x300?text=No+Image"; }}
        />
      </div>

      <h3>{product.name}</h3>
      <p className="category">{categoryName || "Uncategorised"}</p>
      <p className="price">₹{parseFloat(product.price).toFixed(2)}</p>

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
