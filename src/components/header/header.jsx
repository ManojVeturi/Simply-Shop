import "./header.css";
import { useState } from "react";

function Header({ onNavigate, onSearch, isLoggedIn, onLogout }) {
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchText.trim()) return;
    onSearch(searchText);
    setMenuOpen(false);
  }

  function handleNavigate(page) {
    onNavigate(page);
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="logo" onClick={() => handleNavigate("about")}>
        Simply Shop
      </div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
        <button onClick={() => handleNavigate("home")} className="elements">
          Home
        </button>
        <button onClick={() => handleNavigate("about")} className="elements">
          About
        </button>
        <button onClick={() => handleNavigate("contact")} className="elements">
          Contact
        </button>
        <button onClick={() => handleNavigate("cart")} className="elements">
          Cart
        </button>

        {!isLoggedIn ? (
          <>
            <button onClick={() => handleNavigate("login")} className="elements">
              Login
            </button>
            <button onClick={() => handleNavigate("register")} className="elements">
              Register
            </button>
          </>
        ) : (
          <button onClick={() => { onLogout(); setMenuOpen(false); }} className="elements">
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