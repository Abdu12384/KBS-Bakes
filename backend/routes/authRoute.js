const express = require('express')
const auth_Route= express.Router()
const passport = require('passport')
const authController = require('../controllers/authController')
const googleController = require('../controllers/googleController')



  auth_Route.post('/signup',authController.insertUser)
  auth_Route.post('/verifyotp',authController.varifyOTP)
  auth_Route.post('/resendotp',authController.resendOtp)
  auth_Route.post('/login',authController.loadLogin)
  auth_Route.post('/refresh',authController.refreshControll)
  auth_Route.post('/logout',authController.loadLogout)


  auth_Route.get('/google',passport.authenticate('google',{scope:['profile','email']}))
  auth_Route.get('/google/callback',passport.authenticate('google',{session:false}),googleController.googleSingupCallback)








  module.exports = auth_Route