const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./config')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')
const borrowRoutes = require('./routes/borrowRoutes')
dotenv.config()

const app = express()
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/books',bookRoutes)
app.use('/api/',borrowRoutes)

// test route
app.get('/',(req,res) => {
    res.send("Api is running")
})

// Test database connection
/*
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database error:', err))*/

// Syncing models and test Database
sequelize.sync().then(()=> {
  console.log('Database Synced')
  return sequelize.authenticate()
})
  .then(()=> {
    console.log('Database Connected')
  })
  .catch((e)=> {
    console.log('Database error',e);
  }) 


const PORT = process.env.PORT || 3000
app.listen(PORT, () => 
    console.log(`server is running on ${PORT}`)
)