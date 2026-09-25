const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const connectDB = require('./config/db');
const UserRouter=require('./routes/authRoutes')
const ProductRouter=require('./routes/productRoute')
require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())
connectDB()

app.get('/',(req,res)=>{
    res.status(200).json({message:'heelo'})
})
app.use('/api/user',UserRouter)
app.use('/api/product',ProductRouter)
const port=process.env.PORT ||8000
app.listen(port,()=>{
    console.log(`Server connected to PORT ${port}`)
})