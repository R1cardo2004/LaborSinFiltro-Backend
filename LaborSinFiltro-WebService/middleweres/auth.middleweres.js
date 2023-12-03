const middleweres = {}
const debug = require("debug")("app:auth-middlewere")
const {verifyToken} = require("../utils/jwt.utils")
const Usuarios = require('../models/usuario.model')


const PREFIX = "Bearer"

middleweres.authentication = async (req, res, next) => {
    try {
        debug("user auth")

        const { authorisation } = req.headers;
        debug(authorisation)

        if(!authorisation){
            return res.status(400).json({message: "user not authenticated 1"})
        }

        const [token] = authorisation.split(" ")

        //if(prefix !== PREFIX){
        //    return res.status(400).json({message: "user not authenticated 2"})
        //}

        if(!token){
            return res.status(400).json({message: "user not authenticated 3"})
        }

        const payload = await verifyToken(token);

        if(!payload){
            return res.status(400).json({message: "user not authenticated 4"})
        }

        debug(payload)

        const UserId = payload["sub"] 
        
        const user = Usuarios.findById(UserId)

        if(!user){
            return res.status(400).json({message: "user not authenticated 5"})
        }

        req.user = UserId
        req.token = token
        debug(UserId)
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }
}


module.exports = middleweres