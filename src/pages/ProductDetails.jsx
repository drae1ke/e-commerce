import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import AddToCartButton from '../components/AddToCartButton'
import { useParams } from 'react-router-dom'
import './CSS/productDetails.css'

const ProductDetails = () => {
  const { products } = useContext(ShopContext)
  const { productId } = useParams()
  const product = products.find((p) => String(p.id) === String(productId))

  if (!product) {
    return <div className='product-details'>Product not found.</div>
  }

  return (
    <>
      <div className='product-details'>
        <div className='product-details-right-side'>
          <div className='product-images'>
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
          </div>
          <div className='product-image-main'>
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        <div className='product-details-left-side'>
          <div className='product-info'>
            <h1>{product.name}</h1>
            {product.description && <p className="product-description">{product.description}</p>}
            <div className="price-section">
              <span className="product-price">KES{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">KES{product.originalPrice}</span>
              )}
            </div>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className={`stock-status ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                </span>
              </div>
              {product.rating && (
                <div className="meta-item">
                  <span className="meta-label">Rating:</span>
                  <span className="rating">{product.rating}/5 ⭐</span>
                </div>
              )}
            </div>

            <div className="product-specs">
              {product.category && (
                <div className="spec-item">
                  <span className="spec-label">Category:</span>
                  <span className="spec-value">{product.category}</span>
                </div>
              )}
              {product.brand && (
                <div className="spec-item">
                  <span className="spec-label">Brand:</span>
                  <span className="spec-value">{product.brand}</span>
                </div>
              )}
              {product.color && (
                <div className="spec-item">
                  <span className="spec-label">Color:</span>
                  <span className="spec-value">{product.color}</span>
                </div>
              )}
              {product.size && (
                <div className="spec-item">
                  <span className="spec-label">Size:</span>
                  <span className="spec-value">{product.size}</span>
                </div>
              )}
              {product.model && (
                <div className="spec-item">
                  <span className="spec-label">Model:</span>
                  <span className="spec-value">{product.model}</span>
                </div>
              )}
            </div>

            <div className="product-actions">
            <AddToCartButton productId={product.id} />
              <button className="wishlist-btn">❤️ Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
