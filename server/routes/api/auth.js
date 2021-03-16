const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')

// @route GET api/auth
// @desc Test route
// @access Public

router.get('/api/auth', auth, async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch(error) {
    console.error(error.message)
    res.status(500).json({ msg: 'Server error '})
  }
})

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public

router.post('/api/auth', [
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Password is required'
  ).exists() 
], async (req, res) => {
  const errors = validationResult(req) 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    // See if the user exists
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const isMatch = await bcrpyt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload, 
      config.get('authToken'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token }) 
      }  
    )

    // res.send('User registered')
    
  } catch(error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }

  

})

module.exports = router