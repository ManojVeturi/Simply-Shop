import React from 'react';
import './footer.css';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        
        {/* Column 1: Brand Section */}
        <div className="footer-column footer-brand">
          <div className="footer-logo">Simply Shop</div>
          <p className="footer-tagline">
            Your one-stop destination for modern shopping
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li className="footer-link-item">Home</li>
            <li className="footer-link-item">Shop</li>
            <li className="footer-link-item">Contact</li>
            <li className="footer-link-item">Cart</li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="footer-column">
          <h3 className="footer-heading">Support</h3>
          <ul className="footer-links">
            <li className="footer-link-item">FAQs</li>
            <li className="footer-link-item">Privacy Policy</li>
            <li className="footer-link-item">Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 4: Social Media & Newsletter */}
        <div className="footer-column">
          <h3 className="footer-heading">Connect With Us</h3>
          
          <div className="social-icons-container">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-card">
              <FaLinkedin size={22} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-card">
              <FaGithub size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-card">
              <FaInstagram size={22} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-card">
              <FaFacebook size={22} />
            </a>
          </div>

        </div>
      </div>

      {/* Thin Divider Line */}
      <hr className="footer-divider" />

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} <span className="footer-bottom-brand">Simply Shop</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;