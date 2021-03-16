const express = require('express')
const auth = require('../../middleware/auth.js')
const Expense = require('../../models/Expense')

const { check, validationResult } = require('express-validator/check')

const router = new express.Router()

// @route POST api/expense
// @desc Create a new expense
// @access Private

router.post('/api/expense', async (req, res) => {
  const expense = await new Expense(req.body).save()

  try {
    res.status(201).send(expense)
  } catch(e) {
    res.status(400).send()
  }
})

module.exports = router