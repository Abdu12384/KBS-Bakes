const express = require('express')
const admin_Route= express.Router()
const  {cloudinaryImgUpload}= require('../controllers/cloudinaryController')
const {showProduct,
        EditProduct,
        softDelete,
        addProdcut}= require('../controllers/adminController/productController')

const {getUsers,
      toggleUserStatus,
      loadLogout
} = require('../controllers/adminController/userMangement')

const {verifyAdminToken }= require('../middleware/adminAuth')

const {addCategory,
       fetchCategory,
       editCategory,
       softDeleteCategory        
      }= require('../controllers/adminController/categoryControll')










admin_Route
        .get('/generate-upload-url',cloudinaryImgUpload)        
        .post('/add-product',verifyAdminToken,addProdcut)
        .get('/products',verifyAdminToken,showProduct)
        .put('/products/:id',verifyAdminToken,EditProduct)
        .put('/products/:id',verifyAdminToken,softDelete)
        .get('/users',verifyAdminToken,getUsers)
        .put('/users/status/:id',verifyAdminToken,toggleUserStatus)
        .post('/categories',verifyAdminToken,addCategory)
        .get('/categories',verifyAdminToken,fetchCategory)
        .put('/categories/:id',editCategory)
        .patch('/categories/block/:id',verifyAdminToken,softDeleteCategory)
        .post('/logout',loadLogout)

module.exports=admin_Route