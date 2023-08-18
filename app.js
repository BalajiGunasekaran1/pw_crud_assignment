const express = require('express')
const cors = require('cors')
const connectToDb = require('./config/db.js')
const userRouter = require('./routes/userRoutes.js')

const app = express()
// database connection
connectToDb()
//middleware to work with json data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
//User Route
app.use('/',userRouter)
app.get('/',(req,res)=>{
    res.send('<h1>Home</h1>')
})

module.exports =app;
