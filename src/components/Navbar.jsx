import React, { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav>
      <div className="header">
        <h1>E-commerce</h1>
        
        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li 
              className={menuOpen === "Home" ? "active" : ""} 
              onClick={() => { setMenuOpen("Home"); setMobileMenuOpen(false); }}
            >
              <Link to='/'>Home</Link>
            </li>
            <li 
              className={menuOpen === "Computers" ? "active" : ""} 
              onClick={() => { setMenuOpen("Computers"); setMobileMenuOpen(false); }}
            >
              <Link to='/Computers'>Computers</Link>
            </li>
            <li 
              className={menuOpen === "Phones" ? "active" : ""} 
              onClick={() => { setMenuOpen("Phones"); setMobileMenuOpen(false); }}
            >
              <Link to='/Phones'>Phones</Link>
            </li>
            <li 
              className={menuOpen === "Accesories" ? "active" : ""} 
              onClick={() => { setMenuOpen("Accesories"); setMobileMenuOpen(false); }}
            >
              <Link to='/Accesories'>Accesories</Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <div className="cart-icon">
            <FaShoppingCart />
            <span className="cart-count">0</span>
          </div>
          <div className='login-sign-up'>
            <button className='log-in'>
              <Link to='/Login'>Login</Link>
            </button>
          </div>
        </div>

        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;