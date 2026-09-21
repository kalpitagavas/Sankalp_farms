const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please add a name'], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'Please add an email'], 
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password'], 
        minlength: 6 
    },
    phone: { 
        type: String, 
        default: '' 
    }, // Great for delivery notifications and contact
    
    // Saving delivery addresses directly to the user profile
    addresses: [
        {
            street: { type: String },
            city: { type: String },
            state: { type: String }, // e.g., Maharashtra, Gujarat
            postalCode: { type: String },
            country: { type: String, default: 'India' },
            isDefault: { type: Boolean, default: false }
        }
    ],

    isAdmin: { 
        type: Boolean, 
        required: true, 
        default: false 
    }, 
    isActive: { 
        type: Boolean, 
        default: true 
    },

    // Password reset tokens (for future forgot-password feature)
    resetPasswordToken: String,
    resetPasswordExpire: Date

}, { 
    timestamps: true 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;