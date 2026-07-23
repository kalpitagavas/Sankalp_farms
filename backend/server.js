const express=require('express')
const cors=require('cors');
const connectDB=require('./config/db.js')
require('dotenv').config();
const app=express()
connectDB();
app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
res.send('Sankalp API is running...');
})

app.listen(process.env.PORT,() => {
  console.log(`Server running on port ${process.env.PORT}`);
});
