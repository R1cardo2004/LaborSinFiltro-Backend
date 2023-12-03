const Usuariocontroller = require("../controllers/usuario.controler")
const express = require("express")
const router = express.Router()
const {CrearUsuarioValidator} = require("../validators/usuarios.validators")
const validatefields = require("../validators/index.middlewere")
const {authentication} = require("../middleweres/auth.middleweres")


router.post("/", Usuariocontroller.login)
router.post("/:id/verify/:token", Usuariocontroller.verify)

module.exports= router
