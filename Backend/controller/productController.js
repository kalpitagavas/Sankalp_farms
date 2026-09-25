const Product=require('../models/Product')

// @desc    Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products fetched successfully', data: products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: Could not fetch products' });
    }
};

// @desc    Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product found', data: product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: Invalid Product ID' });
    }
};

// @desc    Create a new product (Admin only)
const createProduct = async (req, res) => {
    try {
        // Product.create directly saves to MongoDB using req.body
        const newProduct = await Product.create(req.body);

        res.status(201).json({ 
            message: 'Product created successfully', 
            data: newProduct 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};
// @desc    Get update product by ID
const updateProduct=async(req,res)=>{
    try{
       const existingProduct=await Product.findById(req.params.id)
        if(!existingProduct){
            return res.status(401).json({message:'Product not found'})
        }
        const getProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(201).json({message:'Product Updated Successfully',data:getProduct})
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
}
// @desc    Get delete product by ID
const deleteProduct=async(req,res)=>{
    try{
       const existingProduct=await Product.findById(req.params.id)
        if(!existingProduct){
            return res.status(401).json({message:'Product not found'})
        }
        const deletePro=await Product.findByIdAndDelete(req.params.id)
        res.status(201).json({message:'Product Deleted Successfully',data:deletePro})
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: `Server Error: ${err.message}` });
    }
}

module.exports={deleteProduct,getProducts,getProductById,createProduct,updateProduct}