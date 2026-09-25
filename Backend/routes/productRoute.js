const express=require('express')
const { getProducts ,getProductById, createProduct, deleteProduct ,updateProduct} = require('../controller/productController')
const { protect, admin } = require('../middleware/authMiddleware');
const router=express.Router()

router.get('/',getProducts)
router.get('/:id',getProductById)

router.post('/:id',protect,admin,createProduct)
router.put('/:id',protect,admin,deleteProduct)
router.delete('/:id',protect,admin,updateProduct)



module.exports=router