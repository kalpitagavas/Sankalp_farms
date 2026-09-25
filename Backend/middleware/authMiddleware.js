const  jwt=require('jsonwebtoken')
const User=require('../models/User')
const protect=async(req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        token=req.headers.authorization.split(' ')[1]

        // Verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
         
        req.user=await User.findById(decoded.id).select('-password');
        next()
    }
   catch(err){
        console.error(err); 
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}
if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
}

// Admin middleware (Requires user to be logged in AND an admin)
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
}

module.exports={ protect, admin };