const express=require('express')
const router= express.Router()

const {handleSignUp, handleLogin}= require('../controllers/user.controller.js')
const {getNews} = require('../controllers/news.controller.js')
const {auth}= require('../middlewares/auth.middlewarre.js')
const {addComment,deleteComment, allComments}= require('../controllers/comments.controller.js')


router
.route("/signup")
.post(handleSignUp)

router
.route("/login")
.post(handleLogin)

router
.route("/getNews")
.get(getNews)

router
.route("/:newsId/addComment")
.post(auth,addComment)

router
.route("/:newsId/deleteComment/:commentId")
.delete(auth, deleteComment);

router
.route("/:newsId/allComments")
.get(allComments)

module.exports=router