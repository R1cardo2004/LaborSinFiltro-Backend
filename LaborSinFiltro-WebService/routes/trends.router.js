const trendscontroller = require("../controllers/trends.controller")
const express = require("express")
const router = express.Router()

router.get("/", trendscontroller.findsimilar)
router.get("/all", trendscontroller.findall)

module.exports= router
