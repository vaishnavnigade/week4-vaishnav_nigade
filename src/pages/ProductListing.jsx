
import { useEffect, useMemo, useState } from "react";
import { getProducts, getCategoryById } from "../api/productService";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/product/ProductCard";

const ProductListing = () => {
  const { add } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({}); // { [category_id]: name }
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products, then resolve the unique category ids to names for display/search.
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);

        const ids = [...new Set(data.map((p) => p.category_id).filter(Boolean))];
        const results = await Promise.all(
          ids.map((id) =>
            getCategoryById(id)
              .then((c) => [id, c.name])
              .catch(() => [id, ""]) // tolerate a missing category
          )
        );
        setCategories(Object.fromEntries(results));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filter by product name OR resolved category name as the user types.
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => {
      const catName = (categories[p.category_id] || "").toLowerCase();
      return p.name.toLowerCase().includes(term) || catName.includes(term);
    });
  }, [products, categories, search]);

  const handleAddToCart = async (product) => {
    try {
      await add(product.id, 1);
    } catch (err) {
      setError(err.message);
    }
  };

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
              categoryName={categories[product.category_id]}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductListing;
