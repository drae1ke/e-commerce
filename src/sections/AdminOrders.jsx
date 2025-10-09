import React, { useMemo, useState, useEffect } from 'react'
import axiosClient from '../api/axiosClient'
import '../pages/CSS/orders.css'

const statusColors = {
	Completed: '#16a34a',
	Pending: '#f59e0b',
	Shipped: '#2563eb',
	Cancelled: '#dc2626',
}

const statusOptions = ['Pending', 'Shipped', 'Completed', 'Cancelled']

const AdminOrders = () => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [statusFilter, setStatusFilter] = useState('All')
	const [query, setQuery] = useState('')
	const [editedStatusById, setEditedStatusById] = useState({})
	const [expandedRowIds, setExpandedRowIds] = useState({})

	const toggleExpand = (orderId) => {
		setExpandedRowIds(prev => ({ ...prev, [orderId]: !prev[orderId] }))
	}

	const getCustomerDisplayName = (order) => {
		// Try common fields first
		const direct = order.customerName || order.customer || order.userName
		if (direct && String(direct).trim()) return direct
		// Look into nested user object shapes
		const user = order.user || order.customerInfo || order.account || {}
		const nested = user.name || user.fullName || user.username || user.userName || user.email
		if (nested && String(nested).trim()) return nested
		// Try contact fields
		const contact = order.email || order.contactEmail || order.phone || order.contact
		if (contact && String(contact).trim()) return contact
		return 'N/A'
	}

	// Fetch orders from API
	const fetchOrders = async () => {
		setLoading(true)
		setError('')
		try {
			const response = await axiosClient.get('/orders')
			const payload = response?.data

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
				const d = payload.data
				ordersData = Array.isArray(d?.orders)
					? d.orders
					: Array.isArray(d?.results)
					? d.results
					: Array.isArray(d?.items)
					? d.items
					: []
			}

			const normalized = (ordersData || []).map(o => ({
				id: o.id || o._id || String(o.orderId || ''),
				customer: o.customer || o.customerName || o.userName || '',
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

	// Save order status selected by admin with endpoint fallbacks
	const saveOrderStatus = async (orderId, currentStatus) => {
		const newStatus = editedStatusById[orderId] ?? currentStatus
		if (!newStatus || newStatus === currentStatus) return
		const candidates = [
			{ method: 'put',   url: `/orders/${orderId}`, body: { status: newStatus } },
			{ method: 'patch', url: `/orders/${orderId}`, body: { status: newStatus } },
			{ method: 'put',   url: `/orders/${orderId}/status`, body: { status: newStatus } },
			{ method: 'patch', url: `/orders/${orderId}/status`, body: { status: newStatus } },
			{ method: 'patch', url: `/admin/orders/${orderId}/status`, body: { status: newStatus } },
		]
		let success = false
		let lastError = null
		for (const attempt of candidates) {
			try {
				const res = await axiosClient[attempt.method](attempt.url, attempt.body)
				if (res?.status >= 200 && res?.status < 300) {
					success = true
					break
				}
			} catch (e) {
				lastError = e
			}
		}
		if (!success) {
			setError(lastError?.response?.data?.message || 'Failed to update order status')
			console.error('Error updating order status:', lastError)
			return
		}
		setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)))
		setEditedStatusById(prev => ({ ...prev, [orderId]: undefined }))
	}

	const filtered = useMemo(() => {
		return orders.filter(o => {
			const matchesStatus = statusFilter === 'All' || o.status === statusFilter
			const matchesQuery = !query || [o.id, o.customerName, o.customer, o.shippingAddress].some(v => 
				v?.toLowerCase().includes(query.toLowerCase())
			)
			return matchesStatus && matchesQuery
		})
	}, [orders, statusFilter, query])

	useEffect(() => {
		fetchOrders()
	}, [])

	if (loading) {
		return (
			<div className="admin-section">
				<div className="loading">Loading orders...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="admin-section">
				<div className="error">
					<h3>Error loading orders</h3>
					<p>{error}</p>
					<button onClick={fetchOrders} className="retry-btn">Retry</button>
				</div>
			</div>
		)
	}

	return (
		<div className="admin-section">
			<div className="section-header">
				<h2>Orders</h2>
				<div className="filters">
					<input 
						value={query} 
						onChange={e=>setQuery(e.target.value)} 
						placeholder="Search by ID, customer, or address"
					/>
					<select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
						<option>All</option>
						<option>Pending</option>
						<option>Shipped</option>
						<option>Completed</option>
						<option>Cancelled</option>
					</select>
				</div>
			</div>
			<div className="table-wrapper">
				<table className="admin-table">
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
						{filtered.length === 0 ? (
							<tr>
								<td colSpan="7" className="no-orders">
									No orders found
								</td>
							</tr>
						) : (
							filtered.map(o => (
								<React.Fragment key={o.id}>
									<tr>
										<td className="expand-cell">
											<button className="expand-toggle" onClick={() => toggleExpand(o.id)} aria-label="Toggle details">
												{expandedRowIds[o.id] ? '▾' : '▸'}
											</button>
										</td>
										<td>{o.id}</td>
										<td>{getCustomerDisplayName(o)}</td>
										<td>{new Date(o.createdAt || o.date).toLocaleDateString()}</td>
										<td>KES{(o.total || 0).toFixed(2)}</td>
										<td>
											<span className="status-badge" style={{backgroundColor: statusColors[o.status]}}>
												{o.status}
											</span>
										</td>
										<td>
											<div className="status-actions">
												<select
													value={editedStatusById[o.id] ?? o.status}
													onChange={(e) => setEditedStatusById(prev => ({ ...prev, [o.id]: e.target.value }))}
													className="status-filter"
												>
													{statusOptions.map(status => (
														<option key={status} value={status}>{status}</option>
													))}
												</select>
												<button
													onClick={() => saveOrderStatus(o.id, o.status)}
													className="status-toggle-btn"
													disabled={(editedStatusById[o.id] ?? o.status) === o.status}
													title={`Save status change`}
												>
													Save
												</button>
											</div>
										</td>
									</tr>
									{expandedRowIds[o.id] && (
										<tr className="row-details">
											<td></td>
											<td colSpan="6">
												<div className="detail-grid">
													<div>
														<strong>Shipping</strong>
														<p>{o.shippingAddress || o.address || '—'}</p>
													</div>
													<div>
														<strong>Items</strong>
														<ul className="items-list">
															{Array.isArray(o.items || o.products) ? (o.items || o.products).map((it, idx) => (
																<li key={idx}>
																	<span className="pill">{it?.quantity || it?.qty || 1}×</span> {it?.name || it?.productName || it?.title || it?.product?.name || 'Item'}
																</li>
															)) : <li>—</li>}
														</ul>
													</div>
													<div>
														<strong>Notes</strong>
														<p>{o.notes || o.comments || o.message || '—'}</p>
													</div>
													<div className="detail-meta">
														<span><strong>Payment:</strong> {o.paymentMethod || o.payment || '—'}</span>
														<span><strong>Phone:</strong> {o.phone || o.contact || o.user?.phone || '—'}</span>
														<span><strong>Email:</strong> {o.email || o.user?.email || '—'}</span>
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
				<p>Filtered: {filtered.length}</p>
			</div>
		</div>
	)
}

export default AdminOrders



