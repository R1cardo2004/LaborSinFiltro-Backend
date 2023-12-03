const reportecontroller = require("../controllers/reportes.controller")
const express = require("express")
const {authentication} = require("../middleweres/auth.middleweres")
const router = express.Router()

router.post("/:identifier",authentication, reportecontroller.makereport)
router.get("/", reportecontroller.findreportes )


module.exports= router