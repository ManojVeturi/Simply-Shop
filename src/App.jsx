import { useEffect, useState } from "react";

import Header from "./components/header/header.jsx";
import About from "./components/about/about.jsx";
import Home from "./components/home/home.jsx";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";
import Contact from "./components/contact/contact.jsx";
import Footer from "./components/footer/footer.jsx";
import Cart from "./components/cart/cart.jsx";
import { API_BASE_URL } from "./config.js";
import "./App.css";

const PRODUCT_API = "https://fakestoreapi.com/products";

function App() {
  const [currentPage, setCurrentPage] = useState("about");

  // products
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // auth
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken") || "";
  });

  // cart
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  // ----- PRODUCTS -----
  useEffect(() => {
    async function fetchProducts() {
      try {
        setProductsLoading(true);
        setProductsError("");
        const res = await fetch(PRODUCT_API);
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProductsError(err.message || "Something went wrong");
      } finally {
        setProductsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // ----- CART -----
  useEffect(() => {
    if (!token) {
      setCartItems([]);
      return;
    }
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function fetchCart() {
    try {
      setCartLoading(true);
      setCartError("");
      const res = await fetch(`${API_BASE_URL}/api/cart/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to load cart");
      }
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      setCartError(err.message || "Error loading cart");
    } finally {
      setCartLoading(false);
    }
  }

  async function handleAddToCart(product) {
    if (!token) {
      alert("Please login first to add items to cart.");
      setCurrentPage("login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      // refresh cart
      await fetchCart();
      alert("Item added to cart!");
    } catch (err) {
      alert(err.message || "Error adding to cart");
    }
  }

  async function handleUpdateCartItem(itemId, newQuantity) {
    if (newQuantity < 1) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/${itemId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) {
        throw new Error("Failed to update cart item");
      }

      const updatedItem = await res.json();
      setCartItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    } catch (err) {
      alert(err.message || "Error updating cart");
    }
  }

  async function handleRemoveCartItem(itemId) {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/${itemId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok && res.status !== 204) {
        throw new Error("Failed to remove cart item");
      }

      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      alert(err.message || "Error removing item");
    }
  }

  // ----- AUTH -----
  function handleLoginSuccess({ user: loggedInUser, token: authToken }) {
    setUser(loggedInUser);
    setToken(authToken);
    localStorage.setItem("authUser", JSON.stringify(loggedInUser));
    localStorage.setItem("authToken", authToken);
    setCurrentPage("home");
  }

  function handleLogout() {
    setUser(null);
    setToken("");
    setCartItems([]);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setCurrentPage("about");
  }

  // ----- HEADER / NAV / SEARCH -----
  function handleNavigate(page) {
    setCurrentPage(page);
  }

  function handleSearch(text) {
    setSearchQuery(text);
    setCurrentPage("home");
  }

  return (
    <>
      <Header
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        isLoggedIn={!!user}
        onLogout={handleLogout}
      />

      {currentPage === "about" && <About />}

      {currentPage === "home" && (
        <Home
          products={products}
          loading={productsLoading}
          error={productsError}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === "cart" && (
        <Cart
          cartItems={cartItems}
          loading={cartLoading}
          error={cartError}
          isLoggedIn={!!user}
          onUpdateQuantity={handleUpdateCartItem}
          onRemoveItem={handleRemoveCartItem}
        />
      )}

      {currentPage === "login" && (
        <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />
      )}

      {currentPage === "register" && <Register onNavigate={handleNavigate} />}

      {currentPage === "contact" && <Contact />}

      <Footer />
    </>
  );
}

export default App;