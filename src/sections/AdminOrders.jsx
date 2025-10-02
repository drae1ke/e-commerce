import React, { useMemo, useState } from 'react'

const sampleOrders = [
	{ id: 'O-5001', customer: 'Jane Doe', date: '2024-08-12', total: 129.99, status: 'Completed' },
	{ id: 'O-5002', customer: 'John Smith', date: '2024-08-15', total: 59.49, status: 'Pending' },
	{ id: 'O-5003', customer: 'Mary Johnson', date: '2024-08-18', total: 220.10, status: 'Shipped' },
	{ id: 'O-5004', customer: 'Elijah Stone', date: '2024-08-20', total: 34.00, status: 'Cancelled' },
]

const statusColors = {
	Completed: '#16a34a',
	Pending: '#f59e0b',
	Shipped: '#2563eb',
	Cancelled: '#dc2626',
}

const AdminOrders = () => {
	const [statusFilter, setStatusFilter] = useState('All')
	const [query, setQuery] = useState('')

	const filtered = useMemo(() => {
		return sampleOrders.filter(o => {
			const matchesStatus = statusFilter === 'All' || o.status === statusFilter
			const matchesQuery = [o.id, o.customer].some(v => v.toLowerCase().includes(query.toLowerCase()))
			return matchesStatus && matchesQuery
		})
	}, [statusFilter, query])

	return (
		<div className="admin-section">
			<div className="section-header">
				<h2>Orders</h2>
				<div className="filters">
					<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by ID or customer"/>
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
							<th>Order ID</th>
							<th>Customer</th>
							<th>Date</th>
							<th>Total</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{filtered.map(o => (
							<tr key={o.id}>
								<td>{o.id}</td>
								<td>{o.customer}</td>
								<td>{new Date(o.date).toLocaleDateString()}</td>
								<td>${o.total.toFixed(2)}</td>
								<td>
									<span className="status-badge" style={{backgroundColor: statusColors[o.status]}}>{o.status}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminOrders



