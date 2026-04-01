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
