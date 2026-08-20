import React, { useState } from "react";
import "./contact.css";
import { User, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Contact Me</h1>
          <p className="contact-subtitle">Have a question or want to work together?</p>
        </div>

        <div className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            
            <div className="input-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <span className="input-icon">
                <User size={20} />
              </span>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <span className="input-icon">
                <Mail size={20} />
              </span>
            </div>

            <div className="input-group">
              <textarea
                name="message"
                className="form-input form-textarea"
                placeholder="Write your message here..."
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <span className="input-icon">
                <MessageSquare size={20} />
              </span>
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <Send size={18} />}
            </button>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="toast">
          <CheckCircle2 color="var(--accent-color)" size={24} />
          <div>
            <h4 style={{ margin: 0, fontSize: '16px' }}>Message Sent!</h4>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
              I'll get back to you soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;