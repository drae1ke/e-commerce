import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import ProductCard from '../components/ProductCard';
import './CSS/shop.css';

const Shop = () => {
  const { products, loading, error } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500000]);

  // Get unique categories from products - normalize them properly
  const categories = ['All', ...new Set(
    products
      .map(product => {
        const category = product.normalizedCategory || product.category;
        // Return the original category string, not lowercased
        return category ? String(category).trim() : null;
      })
      .filter(Boolean) 
  )];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Fix category matching
    let matchesCategory = true;
    if (selectedCategory !== 'All') {
      const productCategory = (product.normalizedCategory || product.category || '').toString().trim();
      const selectedCategoryTrimmed = selectedCategory.trim();
      
      // Direct comparison without case conversion
      matchesCategory = productCategory === selectedCategoryTrimmed;
    }
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <div className="shop-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="shop-content">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-section">
            <h4>Categories</h4>
            {categories.map(category => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="price-input"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="price-input"
                placeholder="Max"
              />
            </div>
          </div>

          <button 
            className="reset-button"
            onClick={() => {
              setSelectedCategory('All');
              setPriceRange([0, 10000]);
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </aside>

        <main className="products-section">
          <div className="products-header">
            <p>{filteredProducts.length} Products Found</p>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                product={product}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;