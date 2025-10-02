import React, { useMemo, useState } from 'react'

const sampleMessages = [
	{ id: 'M-9001', from: 'jane@example.com', subject: 'Order issue', date: '2024-08-20', body: 'Hi, I have an issue with my recent order O-5002. The package arrived damaged. Could you assist with a replacement?' },
	{ id: 'M-9002', from: 'john@example.com', subject: 'Product inquiry', date: '2024-08-22', body: 'Hello, is the MacBook still available in silver? Also, do you offer student discounts?' },
	{ id: 'M-9003', from: 'mary@example.com', subject: 'Shipping question', date: '2024-08-23', body: 'When will my order ship? I placed it yesterday and need it by Friday.' },
]

const AdminMessages = () => {
	const [query, setQuery] = useState('')
	const [activeId, setActiveId] = useState(sampleMessages[0]?.id)

	const filtered = useMemo(() => {
		return sampleMessages.filter(m => [m.from, m.subject, m.id].some(v => v.toLowerCase().includes(query.toLowerCase())))
	}, [query])

	const active = useMemo(() => filtered.find(m => m.id === activeId) || filtered[0], [filtered, activeId])

	return (
		<div className="admin-section messages-layout">
			<div className="inbox">
				<div className="section-header">
					<h2>Messages</h2>
					<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by sender, subject, ID"/>
				</div>
				<ul className="message-list">
					{filtered.map(m => (
						<li key={m.id} className={active?.id === m.id ? 'active' : ''} onClick={()=>setActiveId(m.id)}>
							<div className="from">{m.from}</div>
							<div className="subject">{m.subject}</div>
							<div className="date">{new Date(m.date).toLocaleDateString()}</div>
						</li>
					))}
				</ul>
			</div>
			<div className="message-viewer">
				{active ? (
					<>
						<div className="viewer-header">
							<h3>{active.subject}</h3>
							<div className="meta">
								<span>{active.from}</span>
								<span>{new Date(active.date).toLocaleString()}</span>
							</div>
						</div>
						<p className="body-text">{active.body}</p>
					</>
				) : (
					<div className="empty">No message selected</div>
				)}
			</div>
		</div>
	)
}

export default AdminMessages



