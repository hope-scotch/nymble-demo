const express = require('express')
const connectDB = require('../config/db')
const path = require('path')

const userRoute = require('./routes/api/users.js')
const expenseRoute = require('./routes/api/expense.js')
const authRoute = require('./routes/api/auth.js')

const app = express()
const PORT = process.env.PORT || 5000

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use(userRoute)
app.use(expenseRoute)
app.use(authRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))