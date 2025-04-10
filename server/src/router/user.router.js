const express=require('express')
const router= express.Router()

const {handleSignUp, handleLogin}= require('../controllers/user.controller.js')
const {fetchNewsFromDB} = require('../controllers/news.controller.js')
const {auth}= require('../middlewares/auth.middlewarre.js')
const {addComment,deleteComment, allComments}= require('../controllers/comments.controller.js')


router
.route("/signup")
.post(handleSignUp)

router
.route("/login")
.post(handleLogin)

router
.route("/home")
.get(fetchNewsFromDB)

router
.route("/:newsId/addComment")
.post(auth,addComment)

router
.route("/:commentId/deleteComment")
.delete(auth,deleteComment)

router
.route("/:newsId/allcomments")
.get(allComments)

module.exports=router