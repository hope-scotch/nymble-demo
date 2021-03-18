const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator/check')

// @route POST api/users
// @desc Register user
// @access Public

const User = require('../../models/User')

router.post('/api/users', [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Plase enter a password with 6 or more characters'
  ).isLength({ min: 6 }) 
], async (req, res) => {
  const errors = validationResult(req) 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    // See if the user exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    user = new User({
      name,
      email,
      password
    })
    
    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

  } catch(error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }

  

})

module.exports = router