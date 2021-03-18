import React, { useState } from 'react'
import "./Login.css"
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = ({ authHandler }) => {

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  })

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const loginUser = async () => {
    const { email, password } = formData
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ email, password })

    try {
      const res = await axios.post('/api/auth', body, config)
      authHandler(res.data.token)
      localStorage.setItem('token', res.data.token)
    } catch (error) {
      const errors = error.response.data.errors
      if (errors) {
        console.log(errors)
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    loginUser()
  }

  return (
    <div className='login-container'>
      <form className='login-box' onSubmit={e => onSubmit(e)}>
        <div className='login-heading'>LOGIN</div>
        <div className='credentials'>
            
          <div className='login-cred'>
            <div style={{color:'white'}}>Email</div>
            <input
              placeholder='Email'
              name='email'
              onChange={e => onChange(e)} 
              type="text"/>
          </div>

          <div className='login-cred'>
            <div style={{color:'white'}}>Password</div>
            <input
              placeholder='Password'
              name='password' 
              onChange={e => onChange(e)}
              type="password"/>
          </div>

        </div>
        <div className='sign-up-row'>
          <Link to = '/register' className='sign-up-button' style={{backgroundColor:'green'}}>
            SIGN-UP
          </Link>

          <Link to = '/dashboard' className='sign-up-button' style={{backgroundColor:'blue'}} onClick={e => loginUser()}>
            SIGN-IN
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login