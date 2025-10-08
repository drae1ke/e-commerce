import React from 'react';
import './Hero.css'; 
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="left-hero-content">
          <div className="hero-tag">Exclusive Offers</div>
          <h1>Welcome to <span>FUSHub</span> - Your Electonics Destination</h1>
          <p>Discover the season's durable Electonics at unbeatable prices. Shop now and get 30% off your first order!</p>
          <div className="hero-cta">
            <Link to='/shop'><button className="shop-now">Shop Now</button></Link>
            <Link to='/shop'><button className="explore">Explore Collection</button></Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Brands</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
        <div className="right-hero-content">
          <div className="featured-categories">
            <h2>Featured Categories</h2>
            <div className="category-tags">
              <div className="category-tag"><Link to='/computers'>Computers</Link></div>
              <div className="category-tag"><Link to='/accesories'>Accessories</Link></div>
              <div className="category-tag"><Link to='/phones'>Phones</Link></div>
              <div className="category-tag"><Link to='/computers'>Others</Link></div>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image-main"></div>
            <div className="hero-discount-badge">
              <div className="discount-percent">30% OFF</div>
              <div className="discount-text">First Purchase</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;