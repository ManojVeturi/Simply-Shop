import "./home.css";

function Home({ products, loading, error, searchQuery, onAddToCart }) {
  if (loading) {
    return (
      <section className="home" id="Home">
        <h2>Products</h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="home" id="Home">
        <h2>Products</h2>
        <p className="error-text">{error}</p>
      </section>
    );
  }

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <section className="home" id="Home">
      <h2>Products</h2>
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <div className="product-info">
              <h3>{p.title}</h3>
              <p>₹{(p.price * 80).toFixed(0)}</p>
            </div>
            <button
              className="add-to-cart-button"
              onClick={() => onAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p>No products found for “{searchQuery}”.</p>
        )}
      </div>
    </section>
  );
}

export default Home;
