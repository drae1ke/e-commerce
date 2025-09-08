import React from 'react';
import './Footer.css';

const Footer = () => {
  const openWhatsApp = () => {
    const phone = "+2547961151650";
    const message = "Hello, I'm interested in your services";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section contacts-section">
          <h2>Contacts</h2>
          <div className="contact-method">
            <div className="contact-icon email-icon"></div>
            <a href="mailto:phelleeks@gmail.com" className="contact-link">
              phelleeks@gmail.com
            </a>
          </div>
          <div className="contact-method">
            <div className="contact-icon phone-icon"></div>
            <a href="tel:+2547961151650" className="contact-link">
              +2547 961 151 650
            </a>
          </div>
          <div className="contact-method">
            <div className="contact-icon whatsapp-icon"></div>
            <button className="whatsapp-btn" onClick={openWhatsApp}>
              Chat on WhatsApp
            </button>
          </div>
          <div className="contact-method">
            <div className="contact-icon address-icon"></div>
            <p className="contact-text">Nairobi, Kenya</p>
          </div>
        </div>

        <div className="footer-section about-section">
          <h2>About Us</h2>
          <p className="about-text">
            We provide innovative solutions and quality products to meet your needs. 
            Our team is dedicated to excellence and customer satisfaction.
          </p>
        </div>

        <div className="footer-section links-section">
          <h2>Quick Links</h2>
          <ul className="footer-links">
            <li><a href='/' className="footer-link">Home</a></li>
            <li><a href='#' className="footer-link">About Us</a></li>
            <li><a href='#' className="footer-link">Products</a></li>
            <li><a href='#' className="footer-link">Contact Us</a></li>
            <li><a href='#' className="footer-link">FAQ</a></li>
            <li><a href='#' className="footer-link">Support</a></li>
          </ul>
        </div>

        <div className="footer-section social-section">
          <h2>Follow Us</h2>
          <p className="social-text">Stay connected with us on social media:</p>
          <div className="social-icons">
            <a href='https://www.facebook.com' target="_blank" rel="noopener noreferrer" className="social-icon facebook"></a>
            <a href='https://www.twitter.com' target="_blank" rel="noopener noreferrer" className="social-icon twitter"></a>
            <a href='https://www.instagram.com' target="_blank" rel="noopener noreferrer" className="social-icon instagram"></a>
            <a href='https://www.linkedin.com' target="_blank" rel="noopener noreferrer" className="social-icon linkedin"></a>
          </div>
          <div className="newsletter">
            <p>Subscribe to our newsletter</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" className="email-input" />
              <button type="submit" className="subscribe-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 Your Company Name. All Rights Reserved.</p>
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;