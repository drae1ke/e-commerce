import React, { useContext } from 'react'
import './CSS/cart.css'
import { ShopContext } from '../Context/ShopContext'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, clearCart } = useContext(ShopContext)

  return (
    <div className='cart-container'>
      <h1 className='cart-title'>Cart</h1>
      <div className='cart-items'>
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.map((item)=>(
          <div className='cart-card' key={item.id}>
            <img className='cart-image' src={item.image} alt={item.name} />
            <div className="cart-product-details">
            <h2 className='cart-name'>{item.name}</h2>
            <p className='cart-price'>KES{item.price}</p>
            <p className='cart-qty'>Quantity: {item.quantity}</p>
            <div className='cart-quantity'>
              <label htmlFor="quantity">Quantity</label>
              <input type="number" min='1' value={item.quantity} onChange={(e)=> updateQuantity(item.id, Number(e.target.value))} />
            </div>
            <div className='cart-actions'>
              <button className='cart-btn' onClick={()=> removeFromCart(item.id)}>Remove</button>
              <input type="checkbox"  />
              <label htmlFor="Delivery">Delivery</label>
            </div>
            </div>
          </div>
        ))}
      </div>
     <div className="cart-order-details">
      <h4>Order Summary</h4>
      <p>Items: {cartItems.length}</p>
       <p>Subtotal: KES{cartSubtotal.toFixed(2)}</p>
       <p>Delivery</p><hr />
       <p>Total Price: KES{cartSubtotal.toFixed(2)}</p>

      <button className='order-button' disabled={cartItems.length===0} onClick={clearCart}>Place Order</button>
     </div>
    </div>
  )
}

export default Cart
