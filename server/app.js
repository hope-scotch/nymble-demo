const express = require('express')
const connectDB = require('../config/db')

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))