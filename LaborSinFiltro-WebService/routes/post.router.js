
const Postcontroller = require("../controllers/post.controler")
const express = require("express")
const router = express.Router()
const validatefields = require("../validators/index.middlewere")
const {CrearPostValidator, findByIdValidator} = require("../validators/post.validator")
const {authentication} = require("../middleweres/auth.middleweres")


router.get("/", Postcontroller.findall)
router.post(["/", "/:identifier"],authentication,CrearPostValidator,validatefields, Postcontroller.save)
router.get("/:identifier", findByIdValidator, validatefields, Postcontroller.findById)
router.delete("/:identifier", findByIdValidator, validatefields,Postcontroller.deletebyID)
router.get("//feed", Postcontroller.findallReverse)
router.get("/grupo/:grupo" , Postcontroller.findallReverseByGroup)
router.post("/comment/:identifier", authentication, Postcontroller.addcomment)

module.exports = router;