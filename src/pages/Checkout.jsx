import React, { useContext, useMemo, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link, useNavigate } from 'react-router-dom'
import './CSS/checkout.css'
import axiosClient from '../api/axiosClient'

const Checkout = () => {
  const { cartItems, cartSubtotal, clearCart } = useContext(ShopContext)
  const [placingOrder, setPlacingOrder] = useState(false)
  const navigate = useNavigate()

  const deliveryFee = 500
  const totalAmount = useMemo(() => cartSubtotal + deliveryFee, [cartSubtotal])

  const [form, setForm] = useState({
    address: '',
    phone: '',
    notes: ''
  })

  const updateField = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!cartItems.length) return
    // basic phone check: digits 7-15
    const phoneDigits = String(form.phone || '').replace(/\D/g, '')
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      alert('Please enter a valid phone number')
      return
    }
    setPlacingOrder(true)
    try {
      const items = cartItems.map(ci => ({ product: ci.id, quantity: ci.quantity }))
      const payload = {
        items,
        shippingAddress: form.address,
        phone: form.phone,
        paymentMethod: 'cod',
        transactionId: undefined,
        notes: form.notes || ''
      }
      const res = await axiosClient.post('/orders', payload)
      if (res.status === 201) {
        clearCart()
        navigate('/order', { replace: true, state: { order: res.data?.order } })
      } else {
        // fallback minor error handling
        alert(res?.data?.message || 'Failed to place order')
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to place order'
      alert(message)
    } finally {
      setPlacingOrder(false)
    }
  }

  if (!cartItems.length) {
    return (
      <div className='checkout-empty'>
        <h2>Your cart is empty</h2>
        <Link to="/shop">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className='checkout-container'>
      <aside className='checkout-summary'>
        <h3>Order Summary</h3>
        <div className='checkout-summary-list'>
          {cartItems.map(item => (
            <div key={item.id} className='checkout-summary-item'>
              <img src={item.image} alt={item.name} className='checkout-summary-image' />
              <div className='checkout-summary-item-info'>
                <div className='checkout-summary-item-name'>{item.name}</div>
                <div className='checkout-summary-item-qty'>Qty: {item.quantity}</div>
              </div>
              <div className='checkout-summary-item-total'>KES{(Number(item.price) * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <hr />
        <div className='checkout-totals'>
          <div className='checkout-total-row'>
            <span>Subtotal</span>
            <span>KES{cartSubtotal.toFixed(2)}</span>
          </div>
          <div className='checkout-total-row'>
            <span>Delivery</span>
            <span>KES{deliveryFee.toFixed(2)}</span>
          </div>
          <div className='checkout-total-row checkout-total-row--grand'>
            <span>Total</span>
            <span>KES{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </aside>

      <form onSubmit={handlePlaceOrder} className='checkout-form'>
        <h2>Checkout</h2>
        <label>
          Delivery Address
          <input required name='address' value={form.address} onChange={updateField} placeholder='Street, house/apartment, city' />
        </label>
        <label>
          Phone Number
          <input required name='phone' value={form.phone} onChange={updateField} placeholder='e.g. 0712 345 678' inputMode='tel' />
        </label>
        <label>
          Notes (optional)
          <textarea name='notes' value={form.notes} onChange={updateField} placeholder='Delivery notes or special instructions' />
        </label>
        <button type='submit' disabled={placingOrder} className='place-order-btn'>
          {placingOrder ? 'Placing order...' : 'Place Order'}
        </button>
        <Link to='/cart'>Back to cart</Link>
      </form>
    </div>
  )
}

export default Checkout
