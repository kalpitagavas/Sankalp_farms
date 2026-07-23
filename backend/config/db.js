const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database is connected to server ${conn.connection.host}`)
    }
    catch(err){
        console.log(`Error while connection to Database ${err}`)
        process.exit(1)
    }
}

module.exports=connectDB