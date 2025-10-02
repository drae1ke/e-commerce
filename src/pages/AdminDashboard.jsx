import React, { useState, useMemo } from 'react'
import Sidebar from '../components/Sidebar'
import Cards from '../components/Cards'
import './CSS/AdminDashboard.css'

const AdminCustomers = React.lazy(() => import('../sections/AdminCustomers'))
const AdminOrders = React.lazy(() => import('../sections/AdminOrders'))
const AdminMessages = React.lazy(() => import('../sections/AdminMessages'))


const Dashboard = ()=> {
	const [activeSection, setActiveSection] = useState(0)

	const content = useMemo(() => {
		switch (activeSection) {
			case 0:
				return <Cards />
			case 1:
				return (
					<React.Suspense fallback={<div>Loading customers...</div>}>
						<AdminCustomers />
					</React.Suspense>
				)
			case 3:
				return (
					<React.Suspense fallback={<div>Loading orders...</div>}>
						<AdminOrders />
					</React.Suspense>
				)
			case 4:
				return (
					<React.Suspense fallback={<div>Loading messages...</div>}>
						<AdminMessages />
					</React.Suspense>
				)
			default:
				return <Cards />
		}
	}, [activeSection])

	return(
		<>
		<main className='section-center dashboard'>
		<Sidebar activeItem={activeSection} onChange={setActiveSection}/>
		<div style={{flex: 1}}>
			{content}
		</div>
		</main>
		</>
	)
}

export default Dashboard