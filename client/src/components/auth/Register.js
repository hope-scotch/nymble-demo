import React, { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [success, setSuccess] = useState(false)

  const { name, email, password, confirm_password } = formData

  const registerUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ name, email, password })

    try {  
      await (await axios.post('/api/users', body, config)).data.token
      setSuccess(true)
    } catch (e) {
      const errors = e.response.data.errors
      if (errors) {
        console.log(errors)
      }
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirm_password) {
      return console.log('Error')
    }

    registerUser()
  }

  return (
    <div className='login-container'>
      <form className='login-box' onSubmit={e => onSubmit(e)}>
        <div className='login-heading'>REGISTER</div>
        <div className='credentials'>
          <div className='login-cred'>
            <div style={{color:'white'}}>Username</div>
            <input 
              placeholder='Enter Username'
              type='text'
              name='name'
              value={name}
              onChange={(e) => {
                onChange(e)
              }}
            />
          </div>
          <div className='login-cred'>
            <div style={{color:'white'}}>Email</div>
            <input 
              placeholder='Enter Email'
              type="text"
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='login-cred'>
            <div style={{color:'white'}}>Password</div>
            <input 
              placeholder='Enter Password' 
              type="password"
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='login-cred'>
            <div style={{color:'white'}}>Confirm Password</div>
            <input
              placeholder='Re-Enter Password' 
              type="password"
              name='confirm_password'
              value={confirm_password}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        
        <div className='sign-up-row'>
          <Link
            to={'/login'}
            className='sign-up-button'
            onClick={(e) => registerUser()}
            style={{backgroundColor:'green'}} >
            SIGN-UP
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register