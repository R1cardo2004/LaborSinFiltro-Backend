const EmpresaController = require("../controllers/empresa.controler")
const express = require("express")
const router = express.Router()
const {authentication} = require("../middleweres/auth.middleweres")

router.post("/save", EmpresaController.saveEmpresa)
router.get("/", EmpresaController.findall)
router.post("/setEmpresa/:empresaID", authentication, EmpresaController.addUser)


module.exports = router;