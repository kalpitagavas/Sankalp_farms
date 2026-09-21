const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const connectDB = require('./config/db');
const UserRouter=require('./routes/authRoutes')
require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())
connectDB()

app.get('/',(req,res)=>{
    res.status(200).json({message:'heelo'})
})
app.use('/api/user',UserRouter)
const port=process.env.PORT ||8000
app.listen(port,()=>{
    console.log(`Server connected to PORT ${port}`)
})