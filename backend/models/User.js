const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
name:{type:String,required:true,trim:true},
email:{type:String,required:true,unique:true,trim:true,lowercase:true},
password:{type:String,required:true,minLength:7},
role:{type:String,enum:['customer','admin'],default:'customer'},
avatar: { type: String, default: '' },
addresses:[{
   street: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
    isDefault: { type: Boolean, default: false }
}]
}, { timestamps: true })

const User=mongoose.model('User',userSchema)

module.exports=User