import React, { useContext } from 'react'
import './addToCartButton.css'
import { ShopContext } from '../Context/ShopContext'

const AddToCartButton = ({ productId, quantity = 1, onAdded }) => {
  const { addToCart } = useContext(ShopContext)
  const handleClick = () => {
    addToCart(productId, quantity)
    if (onAdded) onAdded()
  }
  return (
    <div>
        <button className='add-to-cart-button' onClick={handleClick}>
            Add to Cart
        </button>
    </div>
  )
}

export default AddToCartButton
