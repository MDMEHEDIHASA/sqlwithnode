const express = require('express')
const router = express.Router()
const {protect,admin} = require('../middlewares/authmiddlewares')
const productController = require('../controllers/productController')


router.post('/createProduct',protect,admin,productController.createProduct)
router.get('/:id',protect,productController.getProducts)
router.post('/:id',protect,productController.createReview);
router.delete('/:id',protect,admin,productController.deleteProduct);


module.exports = router