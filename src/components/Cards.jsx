import React, { useContext, useMemo } from 'react'
import { FaUsers, FaDollarSign, FaEye, FaShoppingCart, FaChartLine, FaBox, FaClock, FaCheckCircle, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import './Cards.css'
import LowStockAlert from './LowStockAlert'
import { ShopContext } from '../Context/ShopContext'

const Cards = () => {
  const { products, cartItems, cartSubtotal } = useContext(ShopContext)

  // Calculate comprehensive metrics
  const metrics = useMemo(() => {
    const totalProducts = products.length
    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const averageProductPrice = products.length > 0 ? products.reduce((sum, product) => sum + product.price, 0) / products.length : 0
    const lowStockProducts = products.filter(product => (product.stock || 0) < 10).length
    const newArrivals = products.filter(product => product.isNewArrival).length
    
    // Mock data for demonstration - in real app, these would come from API
    const mockData = {
      totalOrders: 1247,
      completedOrders: 1089,
      pendingOrders: 123,
      cancelledOrders: 35,
      totalRevenue: 45680,
      monthlyRevenue: 12340,
      weeklyRevenue: 2890,
      totalVisitors: 18234,
      weeklyVisitors: 3456,
      conversionRate: 3.8,
      conversionRateChange: 0.4,
      averageOrderValue: 42.30,
      averageOrderValueChange: 2.1,
      cartAbandonmentRate: 68.2,
      cartAbandonmentChange: -1.2,
      repeatCustomerRate: 23.5,
      repeatCustomerChange: 1.8,
      clickThroughRate: 1.9,
      clickThroughChange: -0.3
    }

    return {
      ...mockData,
      totalProducts,
      totalCartItems,
      averageProductPrice,
      lowStockProducts,
      newArrivals,
      currentCartValue: cartSubtotal
    }
  }, [products, cartItems, cartSubtotal])

  const formatCurrency = (amount) => `KES ${amount.toLocaleString()}`
  const formatPercentage = (value) => `${value}%`
  const formatNumber = (value) => value.toLocaleString()

  const TrendIndicator = ({ value, isPositive = true }) => (
    <div className={`trend-indicator ${isPositive ? 'positive' : 'negative'}`}>
      {isPositive ? <FaArrowUp /> : <FaArrowDown />}
      <span>{Math.abs(value)}%</span>
    </div>
  )

  return (
    <>
      <div className='cards-container'>
        {/* Main Metrics Row */}
        <div className="main-metrics-row">
          <div className='metric-card primary-card'>
            <div className='card-header'>
              <div className='icon-wrapper revenue'>
                <FaDollarSign />
              </div>
              <div className='header-content'>
                <h4>Total Revenue</h4>
                <span className='time-period'>All time</span>
              </div>
            </div>
            <div className='metric-value'>
              <h3>{formatCurrency(metrics.totalRevenue)}</h3>
              <div className='trend-container'>
                <TrendIndicator value={metrics.conversionRateChange} isPositive={metrics.conversionRateChange > 0} />
                <span className='trend-text'>vs last month</span>
              </div>
            </div>
          </div>

          <div className='metric-card primary-card'>
            <div className='card-header'>
              <div className='icon-wrapper orders'>
                <FaShoppingCart />
              </div>
              <div className='header-content'>
                <h4>Total Orders</h4>
                <span className='time-period'>All time</span>
              </div>
            </div>
            <div className='metric-value'>
              <h3>{formatNumber(metrics.totalOrders)}</h3>
              <div className='trend-container'>
                <TrendIndicator value={2.1} isPositive={true} />
                <span className='trend-text'>vs last month</span>
              </div>
            </div>
          </div>

          <div className='metric-card primary-card'>
            <div className='card-header'>
              <div className='icon-wrapper visitors'>
                <FaEye />
              </div>
              <div className='header-content'>
                <h4>Total Visitors</h4>
                <span className='time-period'>This month</span>
              </div>
            </div>
            <div className='metric-value'>
              <h3>{formatNumber(metrics.totalVisitors)}</h3>
              <div className='trend-container'>
                <TrendIndicator value={5.2} isPositive={true} />
                <span className='trend-text'>vs last month</span>
              </div>
            </div>
          </div>

          <div className='metric-card primary-card'>
            <div className='card-header'>
              <div className='icon-wrapper products'>
                <FaBox />
              </div>
              <div className='header-content'>
                <h4>Total Products</h4>
                <span className='time-period'>In catalog</span>
              </div>
            </div>
            <div className='metric-value'>
              <h3>{formatNumber(metrics.totalProducts)}</h3>
              <div className='trend-container'>
                <span className='trend-text'>{metrics.newArrivals} new arrivals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics Row */}
        <div className="secondary-metrics-row">
          <div className='orders-breakdown-card'>
            <div className='card-header'>
              <div className='icon-wrapper orders'>
                <FaUsers />
              </div>
              <h4>Orders Breakdown</h4>
            </div>
            <div className='orders-stats'>
              <div className='order-stat completed'>
                <div className='stat-icon'>
                  <FaCheckCircle />
                </div>
                <div className='stat-content'>
                  <h5>Completed</h5>
                  <h3>{formatNumber(metrics.completedOrders)}</h3>
                  <span>{((metrics.completedOrders / metrics.totalOrders) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className='order-stat pending'>
                <div className='stat-icon'>
                  <FaClock />
                </div>
                <div className='stat-content'>
                  <h5>Pending</h5>
                  <h3>{formatNumber(metrics.pendingOrders)}</h3>
                  <span>{((metrics.pendingOrders / metrics.totalOrders) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className='order-stat cancelled'>
                <div className='stat-icon'>
                  <FaTimesCircle />
                </div>
                <div className='stat-content'>
                  <h5>Cancelled</h5>
                  <h3>{formatNumber(metrics.cancelledOrders)}</h3>
                  <span>{((metrics.cancelledOrders / metrics.totalOrders) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className='analytics-card'>
            <div className='card-header'>
              <div className='icon-wrapper analytics'>
                <FaChartLine />
              </div>
              <h4>Key Analytics</h4>
            </div>
            <div className='analytics-grid'>
              <div className='analytics-metric'>
                <h5>Conversion Rate</h5>
                <div className='metric-row'>
                  <h3>{formatPercentage(metrics.conversionRate)}</h3>
                  <TrendIndicator value={metrics.conversionRateChange} isPositive={metrics.conversionRateChange > 0} />
                </div>
              </div>
              <div className='analytics-metric'>
                <h5>Avg Order Value</h5>
                <div className='metric-row'>
                  <h3>{formatCurrency(metrics.averageOrderValue)}</h3>
                  <TrendIndicator value={metrics.averageOrderValueChange} isPositive={metrics.averageOrderValueChange > 0} />
                </div>
              </div>
              <div className='analytics-metric'>
                <h5>Cart Abandonment</h5>
                <div className='metric-row'>
                  <h3>{formatPercentage(metrics.cartAbandonmentRate)}</h3>
                  <TrendIndicator value={metrics.cartAbandonmentChange} isPositive={metrics.cartAbandonmentChange < 0} />
                </div>
              </div>
              <div className='analytics-metric'>
                <h5>Repeat Customers</h5>
                <div className='metric-row'>
                  <h3>{formatPercentage(metrics.repeatCustomerRate)}</h3>
                  <TrendIndicator value={metrics.repeatCustomerChange} isPositive={metrics.repeatCustomerChange > 0} />
                </div>
              </div>
            </div>
          </div>

          <div className='revenue-breakdown-card'>
            <div className='card-header'>
              <div className='icon-wrapper revenue'>
                <FaDollarSign />
              </div>
              <h4>Revenue Breakdown</h4>
            </div>
            <div className='revenue-stats'>
              <div className='revenue-stat'>
                <h5>This Month</h5>
                <h3>{formatCurrency(metrics.monthlyRevenue)}</h3>
                <div className='progress-bar'>
                  <div className='progress-fill' style={{width: '75%'}}></div>
                </div>
              </div>
              <div className='revenue-stat'>
                <h5>This Week</h5>
                <h3>{formatCurrency(metrics.weeklyRevenue)}</h3>
                <div className='progress-bar'>
                  <div className='progress-fill' style={{width: '60%'}}></div>
                </div>
              </div>
              <div className='revenue-stat'>
                <h5>Current Cart</h5>
                <h3>{formatCurrency(metrics.currentCartValue)}</h3>
                <div className='progress-bar'>
                  <div className='progress-fill' style={{width: '40%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-row">
          <div className='low-products-card'>
            <LowStockAlert />
          </div>
          
          <div className='quick-stats-card'>
            <div className='card-header'>
              <h4>Quick Stats</h4>
            </div>
            <div className='quick-stats-grid'>
              <div className='quick-stat'>
                <span className='stat-label'>Low Stock Items</span>
                <span className='stat-value'>{metrics.lowStockProducts}</span>
              </div>
              <div className='quick-stat'>
                <span className='stat-label'>New Arrivals</span>
                <span className='stat-value'>{metrics.newArrivals}</span>
              </div>
              <div className='quick-stat'>
                <span className='stat-label'>Cart Items</span>
                <span className='stat-value'>{metrics.totalCartItems}</span>
              </div>
              <div className='quick-stat'>
                <span className='stat-label'>Avg Price</span>
                <span className='stat-value'>{formatCurrency(metrics.averageProductPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}   

export default Cards