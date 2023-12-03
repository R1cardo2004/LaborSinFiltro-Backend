const GrupoController = require("../controllers/Grupo.controler")
const express = require("express")
const router = express.Router()
const {authentication} = require("../middleweres/auth.middleweres")

router.post("/save", authentication, GrupoController.saveGrupo)
router.get("/", GrupoController.findall)
router.get("/:identifier", GrupoController.findbyid)
router.patch("/join/:groupID", authentication, GrupoController.adduser)
router.patch("/fav/:groupID", authentication, GrupoController.addfav)



module.exports = router;