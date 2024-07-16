const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const dotenv = require('dotenv')
require('dotenv').config();
const {readdirSync} = require('fs');
const connectDB = require('./config/db');
const { mongoose } = require('mongoose')
const app = express()
const authRoute = require('./routes/authRoute')
//connectDB
connectDB()

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())

//Route

//#1
// app.use('/api',require('./routes/api'))
// app.get('/roitai',(req,res)=>{
//     res.send('hello routes')
// })

// app.use('/api',authRoute)

//#2
readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)))



const port = process.env.PORT
app.listen(port,()=>{
    console.log('serves is running on port '+port);
})