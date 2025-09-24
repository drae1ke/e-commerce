import React from 'react'
import {FaUsers, FaDollarSign, FaEye} from 'react-icons/fa'
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
           <div className='low-products-card'>
              <LowStockAlert/>
           </div>
        </div>
        <div className="rightside-cards">
          <div className='total-conversion-rate'>
            <div className='card-header'>
              <h4>Conversion Rate</h4>
            </div>
            <h3>3.8%</h3>
            <span>vs last week +0.4%</span>
          </div>
          <div className='metrics'>
            <div className='metric'>
              <h5>Avg Order Value</h5>
              <p>$42.30</p>
            </div>
            <div className='metric'>
              <h5>Cart Abandonment</h5>
              <p>68%</p>
            </div>
            <div className='metric'>
              <h5>Repeat Customers</h5>
              <p>23%</p>
            </div>
            <div className='metric'>
              <h5>CTR</h5>
              <p>1.9%</p>
            </div>
          </div>
           <div className='bottom-cards'>
               <div className='total-sales-card'>
                    <div className='card-header'>
                         <FaDollarSign/>
                         <h4>Total Sales</h4>
                    </div>
                    <h3>$12,450</h3>
                    <span>last 30 days</span>
               </div>
               <div className='total-visitors-card'>
                    <div className='card-header'>
                         <FaEye/>
                         <h4>Visitors</h4>
                    </div>
                    <h3>8,213</h3>
                    <span>this week</span>
               </div>
           </div>
       </div>
    </div>
    </>
  )
}   

export default Cards