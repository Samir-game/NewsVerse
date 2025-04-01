const express=require('express')
const router= express.Router()

const {handleSignUp, handleLogin}= require('../controllers/user.controller.js')



router
.route("/signup")
.post(handleSignUp)

router
.route("/login")
.post(handleLogin)

module.exports=router