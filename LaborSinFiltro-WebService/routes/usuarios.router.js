const Usuariocontroller = require("../controllers/usuario.controler")
const express = require("express")
const router = express.Router()
const {CrearUsuarioValidator} = require("../validators/usuarios.validators")
const validatefields = require("../validators/index.middlewere")
const {authentication} = require("../middleweres/auth.middleweres")


router.get("/",Usuariocontroller.findall)
router.post(["/", "/:identifier"], CrearUsuarioValidator ,validatefields ,Usuariocontroller.save)
router.get("/findbyid", authentication, Usuariocontroller.findById)
router.delete("/:identifier", Usuariocontroller.deletebyID)
router.get("/miusuario/:identifier", Usuariocontroller.findByEmail)

module.exports= router

