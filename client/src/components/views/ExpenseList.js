import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Expenses.css'

const ExpenseList = ({ config, modalHandler, filter, modal , dashboard = false}) => {
  const [expenseList, setExpenseList] = useState([])
  
  const getAllExpenses = async () => {

    try {
      let expenseData,total = 0
      expenseData = await axios.get(`/api/expenses?category=${filter}`, config)

      expenseData.data.forEach((expenseItem) => total += expenseItem.amount)
      localStorage.setItem('total', total)

      if(dashboard)
        expenseData = await axios.get(`/api/expenses?sort=${true}`, config)
      
      setExpenseList(expenseData.data)
    } catch (err) {
      const errors = err.response.data.msg
      if (errors)
        console.log(errors)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`, config)
      await getAllExpenses()
    } catch (error) {
      const errors = error.response.data.errors
      if (errors)
        console.log(errors)
    }
  }


  const renderList = expenseList.map((expenseItem) => {
    return (
      <div className='expenses-item-container' style={{height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '0.5vw'}}>
        <div 
          className='expenses-item' 
          onClick={() => modalHandler(true, true, expenseItem._id)}
          onContextMenu={(e) => {
            e.preventDefault()
            deleteExpense(expenseItem._id)
          }} 
          >
          <div className='expenses-item-col-1'>
            <div style={{fontSize: '1em', color: 'rgb(38, 202, 112)'}}>{expenseItem.category}</div>
            <div style={{fontSize: '0.7em', textOverflow: 'ellipsis', color: 'rgb(23, 150, 201)'}}>{expenseItem.description}</div>
          </div>
          <div className='expenses-item-col-2'>
            <div style={{fontSize: '1em', color: 'rgb(38, 202, 112)'}}>{expenseItem.currency}</div>
            <div style={{fontSize: '1em', textOverflow: 'ellipsis', color: 'rgb(38, 202, 112)'}}>{expenseItem.amount}</div>
          </div>
          <div className='expenses-item-col-3'>
            <div style={{fontSize: '1em', color: 'rgb(23, 150, 201)'}}>{expenseItem.date.slice(0, 10)}</div>
          </div>
        </div>
        {dashboard ? <div></div>: <button className='edit-button' onClick={() => modalHandler(true, true, expenseItem._id)}>Edit</button>}
        {dashboard ? <div></div>: <button className='delete-button' onClick={() => deleteExpense(expenseItem._id)}>Delete</button>}
      </div>
    )
  })

  useEffect(() => {
    getAllExpenses()
  }, [filter, modal])

  return (
    <div className='expenses-list'>
      {renderList}
    </div>
  )
}

export default ExpenseList
