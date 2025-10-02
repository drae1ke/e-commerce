import React, { useMemo, useState } from 'react'

const sampleCustomers = [
	{ id: 'C-1001', name: 'Jane Doe', email: 'jane@example.com', orders: 5, totalSpent: 420.35, joinedAt: '2024-02-14' },
	{ id: 'C-1002', name: 'John Smith', email: 'john@example.com', orders: 2, totalSpent: 89.99, joinedAt: '2024-05-01' },
	{ id: 'C-1003', name: 'Mary Johnson', email: 'mary@example.com', orders: 9, totalSpent: 1023.00, joinedAt: '2023-12-03' },
]

const AdminCustomers = () => {
	const [query, setQuery] = useState('')
	const [sortKey, setSortKey] = useState('name')
	const [sortDir, setSortDir] = useState('asc')

	const filtered = useMemo(() => {
		const byQuery = sampleCustomers.filter(c =>
			[c.name, c.email, c.id].some(field => field.toLowerCase().includes(query.toLowerCase()))
		)
		const sorted = [...byQuery].sort((a,b)=>{
			const av = a[sortKey]
			const bv = b[sortKey]
			if (av === bv) return 0
			if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
			return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
		})
		return sorted
	}, [query, sortKey, sortDir])

	const toggleSort = (key) => {
		if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
		else { setSortKey(key); setSortDir('asc') }
	}

	return (
		<div className="admin-section">
			<div className="section-header">
				<h2>Customers</h2>
				<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, email, ID"/>
			</div>
			<div className="table-wrapper">
				<table className="admin-table">
					<thead>
						<tr>
							<th onClick={()=>toggleSort('id')}>ID</th>
							<th onClick={()=>toggleSort('name')}>Name</th>
							<th onClick={()=>toggleSort('email')}>Email</th>
							<th onClick={()=>toggleSort('orders')}>Orders</th>
							<th onClick={()=>toggleSort('totalSpent')}>Total Spent</th>
							<th onClick={()=>toggleSort('joinedAt')}>Joined</th>
						</tr>
					</thead>
					<tbody>
						{filtered.map(c => (
							<tr key={c.id}>
								<td>{c.id}</td>
								<td>{c.name}</td>
								<td>{c.email}</td>
								<td>{c.orders}</td>
								<td>${c.totalSpent.toFixed(2)}</td>
								<td>{new Date(c.joinedAt).toLocaleDateString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminCustomers



