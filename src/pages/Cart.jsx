import React, { useContext, useState } from 'react'
import './CSS/cart.css'
import { ShopContext } from '../Context/ShopContext'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useContext(ShopContext)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const navigate = useNavigate()
  
  const deliveryFee = 500
  const totalAmount = cartSubtotal + deliveryFee

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)
    // Navigate to checkout and keep cart intact
    navigate('/checkout')
    setIsPlacingOrder(false)
  }

  if (cartItems.length === 0) {
    return (
      <div className='cart-empty'>
        <div className='empty-cart-content'>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to='/computers' className='continue-shopping-btn'>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='cart-container'>
      <h1 className='cart-title'>Shopping Cart ({cartItems.length} items)</h1>
      <div className='cart-items'>
        {cartItems.map((item)=>(
          <div className='cart-card' key={item.id}>
            <img className='cart-image' src={item.image} alt={item.name} />
            <div className="cart-product-details">
              <h2 className='cart-name'>{item.name}</h2>
              <p className='cart-price'>KES{item.price}</p>
              <div className='cart-quantity-controls'>
                <button 
                  className='qty-btn' 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className='cart-qty'>{item.quantity}</span>
                <button 
                  className='qty-btn' 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className='cart-actions'>
                <button className='remove-btn' onClick={()=> removeFromCart(item.id)}>
                  🗑️ Remove
                </button>
                <div className='item-total'>
                  Total: KES{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
     <div className="cart-order-details">
      <h4>Order Summary</h4>
      <div className='order-summary-item'>
        <span>Subtotal ({cartItems.length} items):</span>
        <span>KES{cartSubtotal.toFixed(2)}</span>
      </div>
      <div className='order-summary-item'>
        <span>Delivery Fee:</span>
        <span>KES{deliveryFee.toFixed(2)}</span>
      </div>
      <hr />
      <div className='order-summary-item total'>
        <span>Total:</span>
        <span>KES{totalAmount.toFixed(2)}</span>
      </div>
      
      <div className='delivery-info'>
        <label>
          <input type="checkbox" defaultChecked />
          Standard Delivery (2-3 business days)
        </label>
      </div>

      <button 
        className='order-button' 
        disabled={cartItems.length === 0 || isPlacingOrder}
        onClick={handlePlaceOrder}
      >
        {isPlacingOrder ? 'Processing...' : 'Proceed to Checkout'}
      </button>
      
      <Link to='/computers' className='continue-shopping-link'>
        Continue Shopping
      </Link>
     </div>
    </div>
  )
}

export default Cart
