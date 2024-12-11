const express = require('express')
const auth_Route= express.Router()
const {insertUser,
       varifyOTP,
       resendOtp,
       loadLogin,
       refreshControll,
       loadLogout,
       adminLogin} = require('../controllers/authController')
const googleController = require('../controllers/googleController')



  auth_Route.post('/signup',insertUser)
            .post('/verifyotp',varifyOTP)
            .post('/resendotp',resendOtp)
            .post('/login',loadLogin)
            .post('/refresh-token',refreshControll) 
            .post('/logout',loadLogout)
            .post('/google/signup',googleController.googleSignup)
            .post('/admin/login',adminLogin)

  




  module.exports = auth_Route