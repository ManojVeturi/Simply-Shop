import "./cart.css";

function Cart({
  cartItems,
  loading,
  error,
  isLoggedIn,
  onUpdateQuantity,
  onRemoveItem,
}) {
  if (!isLoggedIn) {
    return (
      <div className="Cart" id="Cart">
        <h1>Please login to view your cart.</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="Cart" id="Cart">
        <h1>Loading cart...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Cart" id="Cart">
        <h1>Error loading cart: {error}</h1>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="Cart" id="Cart">
        <h1>Your cart is empty.</h1>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="Cart" id="Cart">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
            )}

            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>Price: ₹{(Number(item.price) * 80).toFixed(0)}</p>

              <div className="cart-item-quantity">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="-cart-quantity-button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="+cart-quantity-button"
                >
                  +
                </button>
              </div>

              <button
                className="cart-item-remove"
                onClick={() => onRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="cart-total">
        Total: ₹{(total * 80).toFixed(0)}
      </h2>
    </div>
  );
}

export default Cart;
