const express = require('express')
const user_Route= express.Router()

const {
  homeListProduct,
  productDetails,
  handlLogoutUser
} = require('../controllers/userController/productController')

// const {varifyToken} = require('../middleware/userAuth')


user_Route.get('/home-list-Product',homeListProduct)
          .get('/productshow/:id',productDetails)
          .post('/logout',handlLogoutUser)



module.exports=user_Route