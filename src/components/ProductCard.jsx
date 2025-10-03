import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'
import Rating from './Rating'
import './ProductCard.css'

const ProductCard = ({ 
  id, 
  image, 
  name, 
  price, 
  product,
  showRating = false,
  variant = 'default' // 'default' | 'featured'
}) => {
  const navigate = useNavigate()

  const handleImageClick = () => {
    navigate(`/product/${id}`)
  }

  const formattedPrice = typeof price === 'string' && price.includes('KES') 
    ? price 
    : `KES${price}`

  return (
    <div className={`product-card ${variant === 'featured' ? 'product-card--featured' : ''}`}>
      <div className="product-card__image-container">
        <img 
          src={image} 
          alt={name} 
          onClick={handleImageClick} 
          className="product-card__image"
        />
      </div>
      
      <div className="product-card__content">
        <Link to={`/product/${id}`} className="product-card__title-link">
          <h3 className="product-card__title">{name}</h3>
        </Link>
        
        {showRating && product && (
          <div className="product-card__rating">
            <Rating product={product} />
          </div>
        )}
        
        <p className="product-card__price">{formattedPrice}</p>
        
        <div className="product-card__actions">
          <AddToCartButton productId={id} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard

