import React from 'react'
import "./Navbar.css"
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div className='navbar-container'>
            <div className='navbar-menu'>
                <Link to = '/dashboard' className='navbar-button'>Dashboard</Link>
                <Link to = '/expenses' className='navbar-button'>Expenses</Link>
                <Link to = '/report' className='navbar-button'>Report</Link>
                <Link to = '/' className='sign-out-button' onClick={() => localStorage.removeItem('token')}>Sign Out</Link>
            </div>
        </div>
    )
}

export default Navbar
