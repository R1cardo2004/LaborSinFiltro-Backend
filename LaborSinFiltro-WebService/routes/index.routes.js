
const express = require("express")
const router = express.Router()
const postrouter = require("./post.router")
const usuariorouter = require("./usuarios.router")
const feedrouter = require("./feed.router")
const loginrouter = require("./login.router")
const empresarouter = require("./empresa.router")
const gruporouter = require('./grupo.router')
const trendrouter = require('./trends.router')
const reporterouter = require('./reporte.router')

router.use("/post", postrouter)
router.use("/usuario", usuariorouter)
router.use("/feed", feedrouter)
router.use("/login", loginrouter)
router.use("/empresa", empresarouter)
router.use("/grupo", gruporouter)
router.use("/trends", trendrouter)
router.use("/reporte", reporterouter)


module.exports = router;