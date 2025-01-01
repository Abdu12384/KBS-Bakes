const express = require('express')
const user_Route= express.Router()

// ProductController
const {
  homeListProduct,
  productDetails,
  handlLogoutUser,
  cakePage
} = require('../controllers/userController/productController')


//UserAuth
const{
  profileUpdate,
  getProfile,
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


// Order

const{
 placeOrder,
 getOrderDetails,
 getAllOrders,
 cancelOrder,
 rezorpayLoad,
 varifyPayment,
 couponApply,
 cancelProduct
} = require('../controllers/userController/orderController')
const { addWishlist, getWishlist, deleteWishlishProduct,  } = require('../controllers/userController/wishlistController')
const { getAllCoupons } = require('../controllers/adminController/couponController')





user_Route.get('/home-list-Product',homeListProduct)
          .get('/productshow/:id',productDetails)
          .get('/products-list',varifyToken,cakePage)
          .get('/profile-update',varifyToken,getProfile)
          .post('/profile-update',varifyToken,profileUpdate)
          .get('/address-details',varifyToken,showAddress)
          .post('/add-address',varifyToken,addAddress)
          .put('/set-default-address/:id',varifyToken,defaultAddress)
          .delete('/delete-address/:id',varifyToken,deleteAddress)
          .get('/cart/item',varifyToken,getCartItem)
          .put('/cart/update',varifyToken,updateCartQuantity)
          .delete('/cart/remove',varifyToken,removeItemCart)
          .post('/cart-add',varifyToken,addToCart)
          .get('/orders',varifyToken,getAllOrders)
          .post('/order/payment',varifyToken,rezorpayLoad)
          .post('/verify-payment',varifyToken,varifyPayment)
          .post('/place-order',varifyToken,placeOrder)
          .get('/order-details/:orderId',varifyToken,getOrderDetails)
          .post('/cancel-order/:orderId',varifyToken,cancelOrder)
          .post('/cancel-product',varifyToken,cancelProduct)
          .get('/mywishlist',varifyToken,getWishlist)
          .delete('/mywishlist/:productId',varifyToken,deleteWishlishProduct)
          .post('/wishlist/add',varifyToken,addWishlist)
          .get('/coupons',varifyToken,getAllCoupons)
          .post('/apply-coupon',varifyToken,couponApply)
          .post('/logout',handlLogoutUser)
          

module.exports=user_Route