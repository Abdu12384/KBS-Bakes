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
        .patch('/categories/block/:id',verifyAdminToken,softDeleteCategory)
        .post('/logout',verifyAdminToken,loadLogout)

module.exports=admin_Route