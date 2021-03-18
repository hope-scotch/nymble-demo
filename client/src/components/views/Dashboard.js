import React, { useEffect, useState } from 'react'

import Navbar from './../layout/Navbar'
import ExpenseList from './ExpenseList'
import './Dashboard.css'

const Dashboard = () => {
  
  const authToken = localStorage.getItem('token')

  const [loaded, setLoaded] = useState(false)

  const config = {
    headers: {
      'x-auth-token': authToken
    }
  }

  useEffect(() => {
    setLoaded(true)
    console.log(loaded)
  }, [])    

  if (loaded) {
    console.log(authToken)

    if (authToken) {
      return (
        <div className='dashboard-container'>
          <Navbar />
          <div className='dashboard-main-container'>
            <ExpenseList config={config} filter={'None'} dashboard = {true}/>
            <div className='total-amount'>
              <h3>Total Amount Spent</h3>
              <h4>{localStorage.getItem('total')}</h4>
            </div>
          </div>
        </div>
      )
    } 
    else {
      return <h3>Restricted Access</h3>
    }
    
  } else return <h3>Loading...</h3>
}

export default Dashboard
