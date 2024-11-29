const express = require('express')
const auth_Route= express.Router()

  const authController = require('../controllers/authController')



  auth_Route.post('/signup',authController.insertUser)
  auth_Route.post('/verifyotp',authController.varifyOTP)
  auth_Route.post('/resendotp',authController.resendOtp)
  auth_Route.post('/login',authController.loadLogin)
  auth_Route.post('/refresh',authController.refreshControll)
  // auth_Route.post('/logout',authController.refreshControll)




  module.exports = auth_Route