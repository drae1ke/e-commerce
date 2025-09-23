import React from 'react'
import Sidebar from '../components/Sidebar'
import Cards from '../components/Cards'
import './CSS/AdminDashboard.css'


const Dashboard = ()=> {

    return(
        <>
        <main className='section-center dashboard'>
       <Sidebar/>
       <Cards/>
        </main>
        </>
    )
}

export default Dashboard