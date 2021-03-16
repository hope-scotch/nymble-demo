const express = require('express')
const auth = require('../../middleware/auth.js')
const Expense = require('../../models/Expense')

const { check, validationResult } = require('express-validator/check')

const router = new express.Router()

// @route POST api/expense
// @desc Create a new expense
// @access Private

router.post('/api/expense', auth, async (req, res) => {

try {
    const expense = await new Expense({ ...req.body, owner: req.user.id }).save()
    res.status(201).send(expense)
  } catch(e) {
    res.status(400).send({ msg: e.message })
  }
})

// @route GET api/expenses
// @desc Get all the expenses
// @access Private

router.get('/api/expenses', auth, async (req, res) => {

  try {
    const expenses = await Expense.find({ owner: req.user.id })
    res.send(expenses)
  } catch(e) {
    res.status(400).send({ msg: e.message })
  }
})

// @route GET api/expenses/:id
// @desc Get specific task
// @access Private

router.get('/api/expenses/:id', auth, async(req, res) => {

  try {
    const expense = await Expense.findOne({ _id: req.params.id, owner: req.user.id })
    res.send(expense)
  } catch(e) {
    res.status(400).send({ msg: e.message })
  }
})

// @route PATCH api/expenses/:id
// @desc Update a task
// @access Private

router.patch('/api/expenses/:id', auth, async (req, res) => {

  const updates = Object.keys(req.body) // Keys = require(key-value pairs -> An array of Keys Only

  try {
      const expense = await Expense.findOne({ _id: req.params.id, owner: req.user.id })
      
      if (!expense)
          return res.status(404).send()

      // const task = await Task.findById(req.params.id)
      updates.forEach((update) => expense[update] = req.body[update])
      await expense.save()
      
      res.status(200).send(expense)
  } catch (e) {
      res.status(400).send()
  }

})

// @route DELETE api/expenses/:id
// @desc Delete a task
// @access Private

router.delete('/api/expenses/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!expense)
        return res.status(404).send()

    res.status(200).send('Deleted')
  } catch (e) {
    res.status(500).send()
  }

})


module.exports = router