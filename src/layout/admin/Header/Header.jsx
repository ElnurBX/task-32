import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="header__admin">
          <div className="header__admin__logo">
            <h1>GamaNet</h1>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="header__admin__profile">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            <h3>Admin name</h3>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/admin/"><i className="fa-solid fa-table-columns"></i> Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/add"><i className="fa-solid fa-plus"></i> Add Product</Link >
              </li>
            </ul>
          </nav>
    </header>
  )
}

export default Header