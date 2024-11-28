const express = require('express')
const auth_Route= express.Router()

  const authController = require('../controllers/authController')



  auth_Route.post('/signup',authController.insertUser)
  auth_Route.post('/verifyotp',authController.varifyOTP)
  auth_Route.post('/resendotp',authController.resendOtp)

  module.exports = auth_Route