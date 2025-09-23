import React, { useState } from 'react';
import { FaExclamationTriangle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './LowStockAlert.css';

const LowStockAlert = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Sample data - in a real app this would come from props or API
  const lowStockProducts = [
    { id: 1, name: "Premium Wireless Headphones", stock: 2, threshold: 10 },
    { id: 2, name: "Mechanical Keyboard", stock: 5, threshold: 15 },
    { id: 3, name: "Gaming Mouse", stock: 3, threshold: 12 },
    { id: 4, name: "USB-C Hub", stock: 7, threshold: 20 },
    { id: 5, name: "External SSD 1TB", stock: 1, threshold: 5 },
    { id: 6, name: "Bluetooth Speaker", stock: 6, threshold: 15 },
    { id: 7, name: "Webcam 1080p", stock: 4, threshold: 10 },
    { id: 8, name: "Ergonomic Office Chair", stock: 8, threshold: 25 },
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getStockStatus = (stock, threshold) => {
    const percentage = (stock / threshold) * 100;
    if (percentage <= 20) return 'critical';
    if (percentage <= 40) return 'warning';
    return 'low';
  };

  return (
    <div className="low-stock-alert">
      <div className="alert-header" onClick={toggleExpand}>
        <div className="header-left">
          <FaExclamationTriangle className="alert-icon" />
          <h3>Low Stock Alert</h3>
          <span className="product-count">{lowStockProducts.length} items</span>
        </div>
        <div className="header-right">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="products-list">
            {lowStockProducts.map(product => (
              <div 
                key={product.id} 
                className={`product-item ${getStockStatus(product.stock, product.threshold)}`}
              >
                <div className="product-info">
                  <span className="product-name">{product.name}</span>
                  <div className="stock-bar">
                    <div 
                      className="stock-progress"
                      style={{ width: `${(product.stock / product.threshold) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="stock-info">
                  <span className="stock-count">{product.stock} left</span>
                  <span className="stock-threshold">/ {product.threshold}</span>
                </div>
              </div>
            ))}
          </div>
          
        
        </>
      )}
    </div>
  );
};

export default LowStockAlert;