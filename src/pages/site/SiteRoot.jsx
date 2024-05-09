import React from 'react'
import { Outlet } from 'react-router'
import Header from  '../../layout/site/Header/header.jsx'
import Footer from '../../layout/site/footer/Footer.jsx'
const SiteRoot = () => {
    return (
        <React.Fragment>
            <Header/>
            <Outlet/>
            <Footer/>
        </React.Fragment>
    )
}

export default SiteRoot