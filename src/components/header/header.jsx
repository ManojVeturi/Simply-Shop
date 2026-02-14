import "./header.css";
import { useState } from "react";

function Header({ onNavigate, onSearch, isLoggedIn, onLogout }) {
  const [searchText, setSearchText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchText.trim()) return;
    onSearch(searchText);
  }

  return (
    <header className="header">
      <div className="logo" onClick={() => onNavigate("about")}>
        Simply Shop
      </div>

      <nav className="header-nav">
        <button onClick={() => onNavigate("home")} className="elements">
          Home
        </button>
        <button onClick={() => onNavigate("about")} className="elements">
          About
        </button>
        <button onClick={() => onNavigate("contact")} className="elements">
          Contact
        </button>
        <button onClick={() => onNavigate("cart")} className="elements">
          Cart
        </button>

        {!isLoggedIn ? (
          <>
            <button onClick={() => onNavigate("login")} className="elements">
              Login
            </button>
            <button
              onClick={() => onNavigate("register")}
              className="elements"
            >
              Register
            </button>
          </>
        ) : (
          <button onClick={onLogout} className="elements">
            Logout
          </button>
        )}
      </nav>

      <form className="header-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default Header;
