const express = require('express')
const dotenv = require('dotenv')

const sequelize = require('./config')

dotenv.config()

const app = express()
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes);

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