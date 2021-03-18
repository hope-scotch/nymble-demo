import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import Navbar from './../layout/Navbar'
import './Report.css'

const Report = () => {
  const [weeklyExpenses, setWeeklyExpenses] = useState([])
  const [categoryExpenses, setCategoryExpenses] = useState([])
  const[loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    if (!loaded) {
      weeklyFilter()
      categoryFilter()

      if (weeklyExpenses.length === 5 && categoryExpenses.length === 5) {
        console.log('Loaded')
        setLoaded(true)
      }
    }
  }, [weeklyExpenses, categoryExpenses])
  
  const authToken = localStorage.getItem('token')

  if (!authToken)
    return (<Redirect to='/'/>)

  const config = {
    headers: {
      'x-auth-token': authToken
    }
  }

  const weeklyFilter = async () => {
    try {
      let weeklyExpList = []
      for (let i = 1; i <= 5; i++) {
        const res = await axios.get(`/api/expenses?week=${i}`, config)
        
        let amt = 0
        res.data.forEach((el) => amt += el.amount)
        weeklyExpList.push(amt)
      }
      setWeeklyExpenses(weeklyExpList)
      console.log(weeklyExpenses)
    } catch (error) {
      const errors = error.response.data.errors
      if (errors) {
        console.log(errors)
      }
    }
  }

  const categoryFilter = async() => {
    try {
      let categoryExpList = []
      const categories = ['Home', 'Food', 'Fuel', 'Shopping', 'Other']

      for (let i = 0; i < 5; i++) {
        const res = await axios.get(`/api/expenses?category=${categories[i]}`, config)

        let amt = 0
        res.data.forEach((el) => amt += el.amount)

        categoryExpList.push(amt)
      }
      setCategoryExpenses(categoryExpList)
      console.log(categoryExpenses)
    } catch (error) {
      const errors = error.response.data.errors
      if (errors) {
        console.log(errors)
      }
    }
  }


  return (
    <div className='report-container'>
      <Navbar />
      <div className='report-main-container'>
        <div style={{display: 'flex', margin: '2vw', alignItems: 'center'}}>
          <h3>Expenses by</h3>
          <button onClick={weeklyFilter} className='report-button green-color'>Category</button>
          {loaded ? 
            <div className='report-stats'>
              <span className='report-column'>
                <div className='report-button red-color'>Home</div>
                <h4>{categoryExpenses[0]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button orange-color'>Food</div>
                <h4>{categoryExpenses[1]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button yellow-color'>Fuel</div>
                <h4>{categoryExpenses[2]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button blue-color'>Shopping</div>
                <h4>{categoryExpenses[3]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button pink-color'>Other</div>
                <h4>{categoryExpenses[4]}</h4>
              </span>
            </div> : <div></div>
          }
          
        </div>
        
        <div style={{display: 'flex', margin: '2vw', alignItems: 'center'}}>
          <h3>Expenses by</h3>
          <button onClick={categoryFilter} className='report-button green-color'>Week</button>
          {loaded ? 
            <div className='report-stats'>
              <span className='report-column'>
                <div className='report-button red-color'>Week 1</div>
                <h4>{weeklyExpenses[0]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button orange-color'>Week 2</div>
                <h4>{weeklyExpenses[1]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button yellow-color'>Week 3</div>
                <h4>{weeklyExpenses[2]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button blue-color'>Week 4</div>
                <h4>{weeklyExpenses[3]}</h4>
              </span>
              <span className='report-column'>
                <div className='report-button pink-color'>Week 5</div>
                <h4>{weeklyExpenses[4]}</h4>
              </span>
            </div> : <div></div>
          }
        </div>
      </div>
    </div>
  )
}

export default Report
