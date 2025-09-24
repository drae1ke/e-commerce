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
              <Link to='/computers'>Computers</Link>
            </li>
            <li 
              className={menuOpen === "Phones" ? "active" : ""} 
              onClick={() => { setMenuOpen("Phones"); setMobileMenuOpen(false); }}
            >
              <Link to='/phones'>Phones</Link>
            </li>
            <li 
              className={menuOpen === "Accesories" ? "active" : ""} 
              onClick={() => { setMenuOpen("Accesories"); setMobileMenuOpen(false); }}
            >
              <Link to='/accesories'>Accessories</Link>
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