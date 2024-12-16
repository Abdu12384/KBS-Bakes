const express = require('express')
const user_Route= express.Router()

// ProductController
const {
  homeListProduct,
  productDetails,
  handlLogoutUser
} = require('../controllers/userController/productController')


//UserAuth
const{
  profileUpdate,
}= require('../controllers/userController/ProfileCantroller')
const {varifyToken} = require('../middleware/userAuth')


//AddressController
const {
  showAddress,
  addAddress,
  defaultAddress,
  deleteAddress
} = require('../controllers/userController/addressController')

//Cart

const {
 addToCart,
 getCartItem,
 removeItemCart,
 updateCartQuantity
}= require('../controllers/userController/cartCantroller')







user_Route.get('/home-list-Product',homeListProduct)
          .get('/productshow/:id',productDetails)
          .post('/profile-update',varifyToken,profileUpdate)
          .get('/address-details',showAddress)
          .post('/add-address',varifyToken,addAddress)
          .put('/set-default-address/:id',varifyToken,defaultAddress)
          .delete('/delete-address/:id',varifyToken,deleteAddress)
          .get('/cart/item',varifyToken,getCartItem)
          .put('/cart/update',varifyToken,updateCartQuantity)
          .delete('/cart/remove',varifyToken,removeItemCart)
          .post('/cart-add',varifyToken,addToCart)
          .post('/logout',handlLogoutUser)
          

module.exports=user_Route