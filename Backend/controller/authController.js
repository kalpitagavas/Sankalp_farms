const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, adminSecretKey } = req.body;

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // 2. Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Real-world check: Match against the .env secret key
        const isTryingToBecomeAdmin = adminSecretKey === process.env.ADMIN_SECRET_KEY;

        // 4. Create the user in MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            isAdmin: isTryingToBecomeAdmin 
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                message: user.isAdmin ? 'Admin registration successful!' : 'User registration successful!'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        // 2. Check if user exists and password matches the hashed version
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
              _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                message: 'Login successful!'
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

module.exports = {
    registerUser,
    loginUser
};