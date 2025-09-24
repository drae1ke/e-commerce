import React, { useContext, useState } from 'react'
import './addToCartButton.css'
import { ShopContext } from '../Context/ShopContext'

const AddToCartButton = ({ productId, quantity = 1, onAdded }) => {
  const { addToCart } = useContext(ShopContext)
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)
  
  const handleClick = async () => {
    setIsAdding(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    addToCart(productId, quantity)
    setIsAdding(false)
    setAdded(true)
    
    if (onAdded) onAdded()
    
    // Reset added state after 2 seconds
    setTimeout(() => setAdded(false), 2000)
  }
  
  return (
    <div>
        <button 
          className={`add-to-cart-button ${added ? 'added' : ''}`} 
          onClick={handleClick}
          disabled={isAdding}
        >
            {isAdding ? 'Adding...' : added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
    </div>
  )
}

export default AddToCartButton
