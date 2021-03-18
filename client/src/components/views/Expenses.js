import React, { useState } from 'react'
// import { Dropdown } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import Navbar from './../layout/Navbar'
import ExpenseList from './ExpenseList'
import ExpenseModal from './ExpenseModal'

import './Expenses.css'

const Expenses = () => {
  const [isModal, setIsModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState({
    update: false,
    id: ''
  })
  const [filter, setFilter] = useState('None')

  const authToken = localStorage.getItem('token')
  
  if (!authToken)
    return (<Redirect to='/'/>)

  const config = {
    headers: {
      'x-auth-token': authToken
    }
  }

  const modalHandler = (value, update, id) => {
    setIsModal(value)
    setIsUpdate({update, id})
  }

  return (
    <div className='expenses-container'>
      <Navbar />
      
      {isModal ? <ExpenseModal authToken={authToken} modalHandler={modalHandler} isUpdate={isUpdate} />: <div />}
      <div className='expenses-main-container'>
          <div className='expenses-list-container'>
            <ExpenseList authToken={authToken} config={config} modalHandler={modalHandler} filter={filter} modal={isModal} />
          </div>
          <div className='expense-container'>
            <button className='new-expense-button' onClick={() => modalHandler(true, false, '')}>New Expense</button> 
            <button className='filter-button' onClick={() => setFilter('None')} style={{backgroundColor: 'rgb(21, 53, 197)'}}>Clear Filter</button>
            <button className='filter-button' onClick={() => setFilter('Home')}>Home</button>
            <button className='filter-button' onClick={() => setFilter('Food')}>Food</button>
            <button className='filter-button' onClick={() => setFilter('Fuel')}>Fuel</button>
            <button className='filter-button' onClick={() => setFilter('Shopping')}>Shopping</button>
            <button className='filter-button' onClick={() => setFilter('Other')}>Other</button>
          </div>

          
      </div>
    </div>
  )
}

export default Expenses
