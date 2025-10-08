import React, { useContext, useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useContext(ShopContext);

  return (
    <nav>
      <div className="header">
        <h1>FUSHub Electronics</h1>
        
        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li 
              className={menuOpen === "Home" ? "active" : ""} 
              onClick={() => { setMenuOpen("Home"); setMobileMenuOpen(false); }}
            >
              <Link to='/'>Home</Link>
            </li>
            <li 
              className={menuOpen === "About Us" ? "active" : ""} 
              onClick={() => { setMenuOpen("About Us"); setMobileMenuOpen(false); }}
            >
              <Link to='/aboutus'>About Us</Link>
            </li>
            <li 
              className={menuOpen === "Contacts" ? "active" : ""} 
              onClick={() => { setMenuOpen("Contacts"); setMobileMenuOpen(false); }}
            >
              <Link to='/contact'>Contact</Link>
            </li>
            <li 
              className={menuOpen === "shop" ? "active" : ""} 
              onClick={() => { setMenuOpen("shop"); setMobileMenuOpen(false); }}
            >
              <Link to='/shop'>Shop</Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <div className="cart-icon">
            <Link to='/cart'>
            <FaShoppingCart />
            <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
          <div className='login-sign-up'>
            <button className='log-in'>
              <Link to='/login'>Login</Link>
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