import "./header.css";
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Menu, X, LogOut, Settings } from "lucide-react";

function Header({ onNavigate, onSearch, isLoggedIn, onLogout }) {
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const profileRef = useRef(null);
  
  // Mock cart items count
  const cartItemsCount = 3; 

  // Handle clicking outside of profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [menuOpen]);

  function handleSubmit(e) {
    if (e) e.preventDefault();
    if (!searchText.trim()) return;
    onSearch(searchText);
    setMenuOpen(false);
  }

  function handleNavigate(page) {
    onNavigate(page);
    setMenuOpen(false);
    setProfileOpen(false);
  }

  // Common Nav Links
  const NavLinks = () => (
    <>
      <button onClick={() => handleNavigate("home")} className="elements">
        Home
      </button>
      <button onClick={() => handleNavigate("contact")} className="elements">
        Contact
      </button>
    </>
  );

  return (
    <div className="header-wrapper">
      <header className="header">
        
        {/* Logo */}
        <div className="logo" onClick={() => handleNavigate("home")}>
          Simply Shop
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <NavLinks />
        </nav>

        {/* Desktop Search */}
        <form className="search-container" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search size={18} className="search-icon" />
        </form>

        {/* Actions Container */}
        <div className="actions">
          
          {/* Cart Icon */}
          <button 
            className="icon-btn cart-container" 
            onClick={() => handleNavigate("cart")}
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </button>

          {/* User Profile / Auth */}
          {isLoggedIn ? (
            <div className="profile-wrapper" ref={profileRef} style={{position: 'relative'}}>
              <button 
                className="icon-btn" 
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Profile"
              >
                <User size={22} />
              </button>
              
              {profileOpen && (
                <div className="profile-dropdown">
                  <button className="dropdown-item" onClick={() => handleNavigate("profile")}>
                    <User size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }}/>
                    My Profile
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigate("orders")}>
                    <ShoppingCart size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }}/>
                    My Orders
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigate("settings")}>
                    <Settings size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }}/>
                    Settings
                  </button>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '5px 0' }} />
                  <button 
                    className="dropdown-item" 
                    style={{ color: '#ff4b2b' }}
                    onClick={() => { onLogout(); setProfileOpen(false); }}
                  >
                    <LogOut size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }}/>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="auth-btn btn-login" onClick={() => handleNavigate("login")}>
                Login
              </button>
              <button className="auth-btn btn-register" onClick={() => handleNavigate("register")}>
                Sign Up
              </button>
            </div>
          )}

          {/* Hamburger Menu Icon */}
          <button 
            className="hamburger" 
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={28} />
          </button>
        </div>

      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`} 
        onClick={() => setMenuOpen(false)} 
      />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <button className="drawer-close" onClick={() => setMenuOpen(false)}>
          <X size={28} />
        </button>

        <form className="search-container" onSubmit={handleSubmit} style={{marginTop: '20px'}}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search size={18} className="search-icon" />
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <NavLinks />
        </div>

        <div className="auth-buttons" style={{ marginTop: 'auto', marginBottom: '20px' }}>
          {isLoggedIn ? (
            <>
              <button className="dropdown-item" onClick={() => handleNavigate("profile")}>My Profile</button>
              <button className="dropdown-item" onClick={() => handleNavigate("orders")}>My Orders</button>
              <button 
                className="dropdown-item" 
                style={{ color: '#ff4b2b' }}
                onClick={() => { onLogout(); setMenuOpen(false); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="auth-btn btn-login" onClick={() => handleNavigate("login")}>Login</button>
              <button className="auth-btn btn-register" onClick={() => handleNavigate("register")}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;