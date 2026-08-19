
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/productService";
import ProductCard from "../components/product/ProductCard";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the catalogue once on mount.
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter by name OR category as the user types (memoised for performance).
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.category || "").toLowerCase().includes(term)
    );
  }, [products, search]);

  // Placeholder until Milestone 3 wires the cart context.
  const handleAddToCart = (product) =>
    console.log("TODO Milestone 3: add to cart", product.id);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <section>
      <input
        className="search-bar"
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductListing;
