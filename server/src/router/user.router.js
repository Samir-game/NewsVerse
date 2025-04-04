const express=require('express')
const router= express.Router()

const {handleSignUp, handleLogin}= require('../controllers/user.controller.js')
const {getNews} = require('../controllers/news.controller.js')



router
.route("/signup")
.post(handleSignUp)

router
.route("/login")
.post(handleLogin)

router
.route("/getNews")
.get(getNews)

module.exports=router