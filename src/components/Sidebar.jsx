import React from 'react'
import {FaUsers, FaBoxOpen, FaShoppingCart, FaFacebookMessenger, FaChartLine} from 'react-icons/fa'
import { useState } from 'react'
import './Sidebar.css'

const Sidebar = () => {

    const [activeItem, setActiveItem] = useState(0);

    const handleItemClick = (index) => {
        setActiveItem(index);
    };
  return (
    <div className="sidebar">
        <ul>
            <li onClick={() => handleItemClick(0)}
                className={activeItem === 0 ? 'active' : ''}>
                <div className="sidebar-item">
                    {/* You can use a dashboard icon here if you want */}
                    <span className='nav-icon'></span>
                    <span className='nav-text'>Dashboard</span>
                </div>
            </li>
            <li onClick={() => handleItemClick(1)}
                className={activeItem === 1 ? 'active' : ''}>
                <div className="sidebar-item">
                    <FaUsers className="nav-icon"/>
                    <span className='nav-text'>Customers</span>
                </div>
            </li>
            <li onClick={() => handleItemClick(2)}
                className={activeItem === 2 ? 'active' : ''}>
                <div className="sidebar-item">
                    <FaBoxOpen className="nav-icon"/>
                    <span className='nav-text'>Products</span>
                </div>
            </li>
            <li onClick={() => handleItemClick(3)}
                className={activeItem === 3 ? 'active' : ''}>
                <div className="sidebar-item">
                    <FaShoppingCart className="nav-icon"/>
                    <span className='nav-text'>Orders</span>
                </div>
            </li>
            <li onClick={() => handleItemClick(4)}
                className={activeItem === 4 ? 'active' : ''}>
                <div className="sidebar-item">
                    <FaFacebookMessenger className="nav-icon"/>
                    <span className='nav-text'>Messages</span>
                </div>
            </li>
            <li onClick={() => handleItemClick(5)}
                className={activeItem === 5 ? 'active' : ''}>
                <div className="sidebar-item">
                    <FaChartLine className="nav-icon"/>
                    <span className='nav-text'>Analytics</span>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar

