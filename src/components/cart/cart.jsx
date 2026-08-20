import "./cart.css";

import { ShoppingCart } from "lucide-react";

function Cart({
  cartItems,
  loading,
  error,
  isLoggedIn,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}) {
  if (!isLoggedIn) {
    return (
      <div className="cart-auth-wrapper">
        <div className="cart-auth-card">
          <div className="cart-auth-icon-container">
            <ShoppingCart size={48} className="cart-auth-icon" />
          </div>
          <h1 className="cart-auth-title">Your cart is waiting 🛒</h1>
          <p className="cart-auth-subtitle">
            Please login to view and manage your cart items
          </p>
          
          <div className="cart-auth-actions">
            <button 
              className="cart-auth-btn primary" 
              onClick={() => onNavigate && onNavigate("login")}
            >
              Login
            </button>
            <button 
              className="cart-auth-btn secondary" 
              onClick={() => onNavigate && onNavigate("register")}
            >
              Create Account
            </button>
          </div>
          
          <span 
            className="cart-auth-link" 
            onClick={() => onNavigate && onNavigate("home")}
            role="button"
            tabIndex={0}
          >
            Continue Shopping
          </span>
        </div>
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
      <div className="Cart empty-cart-page" id="Cart">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">
            <ShoppingCart size={70} strokeWidth={1.5} />
          </div>

          <h1>
            Your cart is <span>empty.</span>
          </h1>

          <p>
            Looks like you haven't added anything to your cart yet.
            <br />
            Start shopping and find something you love! ❤️
          </p>

          <div className="empty-cart-actions">
            <button
              className="continue-shopping-btn"
              onClick={() => onNavigate && onNavigate("home")}
            >
              <ShoppingCart size={20} />
              Continue Shopping
              <span>→</span>
            </button>

            <button
              className="home-btn"
              onClick={() => onNavigate && onNavigate("home")}
            >
              Go to Home
            </button>
          </div>
        </div>
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
