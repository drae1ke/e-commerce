import React from 'react'
import {FaUsers} from 'react-icons/fa'
import './Cards.css'
import LowStockAlert from './LowStockAlert'

const Cards = () => {
  return (
    <>
    <div className='cards-container'>
        <div className="leftside-cards">
           <div className='total-orders-card'>
               <div className='upper-total-orders-card'>
                   <FaUsers/>
                   <h4>Orders</h4>
                   <h3>1500</h3>
                   <span>this month</span>
               </div>
               <div className='lower-total-orders-card'>
                   <div className='completed-orders'>
                          <h4>Completed</h4>
                            <h3>1200</h3>
                   </div>
                   <div className='pending-orders'>
                            <h4>Pending</h4>
                            <h3>300</h3>
                   </div>
                   <div className='cancelled-orders'>
                            <h4>Cancelled</h4>
                            <h3>00</h3>
                   </div>
               </div>
           </div>
           <div className='total-products-card'>
              <LowStockAlert/>
           </div>
        </div>
        <div className="rightside-cards">
           <div className='total-orders-card'></div>
           <div className='less-quantity-card'></div>
           <div className='bottom-cards'>
                <div className='total-sales-card'></div>
                <div className='total-visitors-card'></div>
           </div>
       </div>
    </div>
    </>
  )
}   

export default Cards