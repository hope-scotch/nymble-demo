import axios from 'axios'
import React,{ useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './ExpenseModal.css'
import './../auth/Login.css'

const ExpenseModal = ({ modalHandler, isUpdate }) => {

  const [formData, setFormData] = useState({
    date: new Date(),
    amount: 0,
    currency: '',
    description: '',
    category: ''
  })

  const authToken = localStorage.getItem('token')

  if (!authToken)
    return (<Redirect to='/'/>)

  const { date, amount, currency, description, category } = formData
  
  const createExpense = async () => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken
      }
    }

    const body = JSON.stringify({ date, amount, currency, description, category })

    try {
      const res = await axios.post('/api/expense', body, config)
      console.log(res)
    } catch (error) {
      const errors = error.response.data.errors
      if (errors) {
        console.log(errors)
      }
    }
  }

  const updateExpense = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken
      }
    }

    const body = JSON.stringify({ date, amount, currency, description, category })

    try {
      const res = await axios.patch(`/api/expenses/${isUpdate.id}`, body, config)
      console.log(res)
    } catch (error) {
      const errors = error.response.data.errors
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

    // createExpense()
    modalHandler(true, isUpdate.update, isUpdate.id)
  }

  return (
    <div className='expense-modal-container'>
      <form className='modal-box' onSubmit={e => onSubmit(e)}>
        <div className='modal-heading'>Create New Expense</div>
        
        <div className='modal-credentials'>
          <div className='modal-cred'>
            <div>Date</div>
            <input 
              type='date'
              name='date'
              value={date}
              onChange={(e) => {
                onChange(e)
              }}
            />
          </div>
          <div className='modal-cred'>
            <div>Amount</div>
            <input 
              placeholder='Amount'
              type='text'
              name='amount'
              value={amount}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='modal-cred'>
            <div>Currency</div>
            <input 
              placeholder='Currency' 
              type='text'
              name='currency'
              value={currency}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='modal-cred'>
            <div>Description</div>
            <input
              placeholder='Description' 
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='modal-cred'>
            <div>Category</div>
            <button className='modal-category-button' onClick={()=>setFormData({ ...formData, category: 'Home' })}>Home</button>
            <button className='modal-category-button' onClick={()=>setFormData({ ...formData, category: 'Fuel' })}>Fuel</button>
            <button className='modal-category-button' onClick={()=>setFormData({ ...formData, category: 'Food' })}>Food</button>
            <button className='modal-category-button' onClick={()=>setFormData({ ...formData, category: 'Shopping' })}>Shopping</button>
            <button className='modal-category-button' onClick={()=>setFormData({ ...formData, category: 'Other' })}>Other</button>
          </div>
        </div>

        <div className='modal-close-row'>
          <Link to = '/expenses' className='modal-close-button' style={{backgroundColor:'red',opacity:'0.7'}} onClick={(e) => {
              modalHandler(false, isUpdate.update, isUpdate.id)
            }}>
            Cancel
          </Link>

          <Link to = '/expenses' className='modal-close-button' onClick={(e) => {
              console.log('Clicked!')
              isUpdate.update ? updateExpense() : createExpense()
              modalHandler(false, isUpdate.update, isUpdate.id)
            }}>
            Done
          </Link>
        </div>
  
      </form>
    </div>
  )
}

export default ExpenseModal
