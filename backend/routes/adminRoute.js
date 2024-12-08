const express = require('express')
const admin_Route= express.Router()
const  {cloudinaryImgUpload}= require('../controllers/cloudinaryController')
const {showProduct,
        EditProduct,
        softDelete,
        addProdcut}= require('../controllers/adminController/productController')

const {getUsers,
      toggleUserStatus} = require('../controllers/adminController/userMangement')

const {verifyAdminToken }= require('../middleware/adminAuth')
 const {refreshControll} = require('../controllers/authController')










admin_Route
        .get('/generate-upload-url',verifyAdminToken,cloudinaryImgUpload)
        .post('/add-product',verifyAdminToken,addProdcut)
        .get('/products',verifyAdminToken,showProduct)
        .put('/products/:id',EditProduct)
        .put('/products/:id',softDelete)
        .get('/users',getUsers)
        .put('/users/status/:id',toggleUserStatus)


module.exports=admin_Route