const express = require('express')
const auth_Route= express.Router()

const authController = require('../controllers/authController')



auth_Route.post('/signup',authController.insertUser)

module.exports = auth_Route