const Reporte = require('../models/reporte.model')
const controller = {};

controller.makereport = async (req, res, nest) => {
    try {
        const {identifier} = req.params
        const {user} = req
        const {contenido} = req.body

        const reporte = new Reporte({
            post:identifier,
            user: user,
            contenido: contenido
        })

        const repotesave = await reporte.save()
        if(!repotesave){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  post"})
        }

        return res.status(201).json(repotesave)

    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findreportes = async (req, res, next) => {
    try {
        const reporte = await Reporte.find({}).populate("post", "titulo texto autor grupo").populate("user", "username email")
        return res.status(200).json({ reporte })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

module.exports= controller