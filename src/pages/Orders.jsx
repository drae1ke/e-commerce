import React, { useState, useEffect } from 'react'
import axiosClient from '../api/axiosClient'
import './CSS/orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [editedStatusById, setEditedStatusById] = useState({})
  const [expandedRowIds, setExpandedRowIds] = useState({})

  const statusColors = {
    Pending: '#f59e0b',
    Shipped: '#2563eb', 
    Completed: '#16a34a',
    Cancelled: '#dc2626'
  }

  const statusOptions = ['Pending', 'Shipped', 'Completed', 'Cancelled']

  const toggleExpand = (orderId) => {
    setExpandedRowIds(prev => ({ ...prev, [orderId]: !prev[orderId] }))
  }

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axiosClient.get('/orders')
      const payload = response?.data

      // Extract array of orders from common API shapes
      let ordersData = []
      if (Array.isArray(payload)) {
        ordersData = payload
      } else if (Array.isArray(payload?.data)) {
        ordersData = payload.data
      } else if (Array.isArray(payload?.orders)) {
        ordersData = payload.orders
      } else if (Array.isArray(payload?.results)) {
        ordersData = payload.results
      } else if (Array.isArray(payload?.items)) {
        ordersData = payload.items
      } else if (payload?.data && typeof payload.data === 'object') {
        // Handle nested shapes like { data: { orders: [...] } }
        const d = payload.data
        ordersData = Array.isArray(d?.orders)
          ? d.orders
          : Array.isArray(d?.results)
          ? d.results
          : Array.isArray(d?.items)
          ? d.items
          : []
      }

      // Normalize each order
      const normalized = (ordersData || []).map(o => ({
        id: o.id || o._id || String(o.orderId || ''),
        customer: o.userName || '',
        createdAt: o.createdAt || o.date || o.created_on,
        total: typeof o.total === 'number' ? o.total : Number(o.amount || o.totalPrice || 0),
        status: o.status || 'Pending',
        shippingAddress: o.shippingAddress || o.address || '',
        ...o
      }))

      setOrders(normalized)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch orders')
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  // Save order status selected by admin
  const saveOrderStatus = async (orderId, currentStatus) => {
    const newStatus = editedStatusById[orderId] ?? currentStatus
    if (!newStatus || newStatus === currentStatus) return
    try {
      const response = await axiosClient.put(`/orders/${orderId}`, { status: newStatus })
      if (response.status === 200) {
        setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)))
        setEditedStatusById(prev => ({ ...prev, [orderId]: undefined }))
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update order status')
      console.error('Error updating order status:', err)
    }
  }

  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    const matchesQuery = !searchQuery || 
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesQuery
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading orders...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error">
          <h3>Error loading orders</h3>
          <p>{error}</p>
          <button onClick={fetchOrders} className="retry-btn">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Orders Management</h2>
        <div className="orders-controls">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="All">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-orders">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <React.Fragment key={order.id}>
                  <tr>
                    <td className="expand-cell">
                      <button className="expand-toggle" onClick={() => toggleExpand(order.id)} aria-label="Toggle details">
                        {expandedRowIds[order.id] ? '▾' : '▸'}
                      </button>
                    </td>
                    <td>{order.id}</td>
                    <td>{order.name || order.customer || 'N/A'}</td>
                    <td>{new Date(order.createdAt || order.date).toLocaleDateString()}</td>
                    <td>KES{(order.total || 0).toFixed(2)}</td>
                    <td>
                      <span 
                        className="status-badge" 
                        style={{backgroundColor: statusColors[order.status]}}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="status-actions">
                        <select
                          value={editedStatusById[order.id] ?? order.status}
                          onChange={(e) => setEditedStatusById(prev => ({ ...prev, [order.id]: e.target.value }))}
                          className="status-filter"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => saveOrderStatus(order.id, order.status)}
                          className="status-toggle-btn"
                          disabled={(editedStatusById[order.id] ?? order.status) === order.status}
                          title={`Save status change`}
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRowIds[order.id] && (
                    <tr className="row-details">
                      <td></td>
                      <td colSpan="6">
                        <div className="detail-grid">
                          <div>
                            <strong>Shipping Address</strong>
                            <p>{order.shippingAddress || order.address || '—'}</p>
                          </div>
                          <div>
                            <strong>Items</strong>
                            <ul className="items-list">
                              {Array.isArray(order.items || order.products) ? (order.items || order.products).map((it, idx) => (
                                <li key={idx}>
                                  <span className="pill">{it?.quantity || it?.qty || 1}×</span> {it?.name || it?.productName || it?.title || it?.product?.name || 'Item'}
                                </li>
                              )) : <li>—</li>}
                            </ul>
                          </div>
                          <div>
                            <strong>Notes</strong>
                            <p>{order.notes || order.comments || order.message || '—'}</p>
                          </div>
                          <div className="detail-meta">
                            <span><strong>Payment:</strong> {order.paymentMethod || order.payment || '—'}</span>
                            <span><strong>Phone:</strong> {order.phone || order.contact || order.user?.phone || '—'}</span>
                            <span><strong>Email:</strong> {order.email || order.user?.email || '—'}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="orders-summary">
        <p>Total Orders: {orders.length}</p>
        <p>Filtered: {filteredOrders.length}</p>
      </div>
    </div>
  )
}

export default Orders
