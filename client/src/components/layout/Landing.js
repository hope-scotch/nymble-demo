import React from 'react'
import { Link } from 'react-router-dom'

import './Landing.css'

const Landing = () => {
  return (
    <div className='landing-container'>
      <div style={{fontSize: '3em'}}>
        Welcome to Nymble Demo Expense Manager
      </div>
      <div className='buttons-container'>
        <Link to='/login' className='login-button'>Login</Link>
        <Link to='/register' className='register-button'>Register</Link>
      </div>
    </div>
  )
}

export default Landing
