const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  time: {
    type: String
  },
  amount: {
    type: Number
  },
  currency: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'User'
  }
})

const Expense = mongoose.model('expense', ExpenseSchema)

module.exports = Expense