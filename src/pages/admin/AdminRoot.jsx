import React from 'react'
import Header from '../../layout/admin/Header/Header'
import { Outlet } from 'react-router'
import Footer from '../../layout/admin/Footer/Footer'
import './admin.scss'
const SiteRoot = () => {
    return (
        <div className='Admin'>
            <div className="Admin__header">
            <Header/><Footer/>  
            </div>
            <div className="Admin__main">
            <Outlet/>
            <div className="salam"></div>
            </div>
        </div>
    )
}

export default SiteRoot