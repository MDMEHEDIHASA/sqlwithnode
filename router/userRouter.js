const express = require('express')
const router = express.Router()
const {protect,admin} = require('../middlewares/authmiddlewares')
const userController = require('../controllers/userController')



router.post('/create',userController.createUser)
router.post('/login',userController.loginUser)
router.get('/',protect,admin,userController.getAllUsers)
router.post('/profile',protect,userController.updateProfile)

module.exports = router;