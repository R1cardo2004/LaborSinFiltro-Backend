const Postcontroller = require("../controllers/post.controler")
const express = require("express")
const router = express.Router()
const {authentication} = require("../middleweres/auth.middleweres")

router.get("/",Postcontroller.findallReverse)
router.get("/user" , authentication,Postcontroller.findallReverseByUser)
router.patch("/:identifier",authentication, Postcontroller.LikePost)
router.get("/likes", authentication, Postcontroller.findbylike)

module.exports = router;