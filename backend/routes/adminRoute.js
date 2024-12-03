const express = require('express')
const admin_Route= express.Router()
const  cloudinaryUpload= require('../controllers/cloudinaryController')
const productController = require('../controllers/adminController/productController')









admin_Route.get('/generate-upload-url',cloudinaryUpload.cloudinaryImgUpload)
admin_Route.post('/add-product',productController.addProdcut)



module.exports=admin_Route