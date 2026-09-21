const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String,required: [true, 'Please add a product name'],trim:true },
    price: { type: Number, required: [true,'Please add a product price'],default:0.0},
    compareAtPrice: { 
        type: Number, 
        default: 0.0 
    }, // Original price for showing discounts (e.g., Strikethrough price)
    costPrice: { 
        type: Number 
    }, // What it costs you to source it (great for admin profit tracking)
    description: { type: String, required: [true,'Please add a description'] },
   images: [{ 
        public_id: { type: String },
        url: { type: String, required: true } 
    }], // Supports multiple images per product
    featuredImage: { 
        type: String 
    },
    unit:{
        type:String,default:'piece'
    },
    weight:{value:{type:Number},unit: { type: String, default: 'g' } },
    category: { type: String, required: [true, 'Please specify a category'],index: true  }, 
    region: { 
        type: String, 
        required: [true, 'Please specify the region'],
        enum: ['Konkan', 'Chotila'] 
    },
   subCategory: { 
        type: String 
    },
   
    countInStock: { type: Number, 
        required: [true, 'Please add stock count'], 
        min: 0,
        default: 0},
   sku: { 
        type: String, 
        unique: true 
    }, // Stock Keeping Unit for inventory tracking
    // Ratings & Reviews Stats
    ratingAverage:{type:Number,default:0,min:1,max:5},
    ratingsQuantity:{type:Number,default:0},
    reviews:[{user:{type:mongoose.Schema.ObjectId,ref:'User',required:true},
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    isFeatured: { 
        type: Boolean, 
        default: false 
    }, // To showcase top picks on the homepage banner
    isBestSeller: { 
        type: Boolean, 
        default: false 
    },isActive: { 
        type: Boolean, 
        default: true 
    }, // Soft delete or hide out-of-season products (e.g., seasonal items)
// Multi-language Support Fields (Future-proofing for Marathi/Gujarati translations)
translations: {
        mr: { // Marathi
            name: { type: String },
            description: { type: String }
        },
        gu: { // Gujarati
            name: { type: String },
            description: { type: String }
        }
    }

}, { 
    timestamps: true 
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;