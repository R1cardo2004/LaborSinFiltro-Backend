const Usuarios = require('../models/usuario.model')
const Tokens =  require("../models/token.model")
const SendEmail = require("./verifyEmail.controller")
const cryto = require("crypto");
const controller = {};
const tools = require('../utils/jwt.utils')

controller.save = async (req, res, next) => {
    try{
        res.set('Access-Control-Allow-Origin', '*');
        const {email, username, password} = req.body

        let usuario = await Usuarios.findOne({$or: [{username: username}, {email: email}] })

        if(usuario){
            return res.status(409).json({ error: "user already exist"})
        }
        
        const newUser = new Usuarios({
            username: username,
            email: email,
            password: password
        })

        const usuariosave = await newUser.save()

        const token = await new Tokens({
            userID: newUser._id,
            token: cryto.randomBytes(8).toString("hex")
        }).save()

        const url = `su token de verificacion es ${token.token}`
        await SendEmail(newUser.email, "verificacion por correo", url)

        if(!usuariosave){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  user"})
        }
         
        return res.status(201).json({message: "usuario registrado"})
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findall = async (req, res, next) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');
        const usuario = await Usuarios.find({}).populate("empresa", "Nombre correo").populate("joinedgroups", "NombreGrupo").populate("gruposfav", "NombreGrupo")
        return res.status(200).json({ usuario })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.login =async (req, res, next)  => {
    try {
        const {identifier,password} = req.body
        const usuarios = await Usuarios.findOne({$or: [{email: identifier}, {username: identifier}] })

        if(!usuarios){
           return res.status(404).json({ error: "usuario not found" })
        }

        if(!usuarios.comprarePasswrd(password)){
            return res.status(401).json({ error: "contrasenia incorrecta" })
        }

        if(!usuarios.verificado){
            let token = await Token.findOne({userID: usuarios._id})
            if(!token){
                const token = await new token({
                    userID: usuariosave._id,
                    token: cryto.randomBytes(8).toString("hex")
                }).save()  

                const url = `${process.env.BASE_URL}users/${usuariosave._id}/verify/${Token.token}`
                await SendEmail(usuariosave.email, "verificacion por correo", url)
            }
            return res.status(400).json({message: "email de veirifiacion enviado"})
        }

        const token = await tools.creatToken(usuarios._id)
        let _tokens = [...usuarios.token]

        const _verifypromise = _tokens.map( async (_t) => {
            const status = await tools.verifyToken(_t);
            return status ? _t : null;
        })

        _tokens = ((await Promise.all(_verifypromise))
            .filter(_t => _t)
            .slice(0, 4))

        _tokens = [token, ..._tokens]
        usuarios.token = _tokens

        await usuarios.save();

        return res.status(201).json({ token })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findById = async (req, res, next) => {
    try {
        const {user} = req;
        const usuario = await Usuarios.findById(user).populate("gruposfav", "NombreGrupo").populate("empresa", "Nombre correo").populate("joinedgroups", "NombreGrupo").populate("gruposfav", "NombreGrupo")
        if(!usuario){
            return res.status(404).json({ error: "usuario not found" })
        }
        return res.status(200).json({ usuario })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }

}

controller.findByEmail = async (req, res, next) => {
    try {
        const { identifier } = req.params
        const usuario = await Usuarios.find({$or: [{email: identifier}, {username: identifier}]})
        if(!usuario){
            return res.status(404).json({ error: "usuario not found" })
        }
        return res.status(200).json({ usuario })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }

}

controller.deletebyID = async (req, res, next) => {
    try {
        const { identifier } = req.params
        const usuario = await Usuarios.findByIdAndDelete(identifier)

        if(!usuario){
            return res.status(404).json({ error: "usuario no encontrado" })
        }

        return res.status(200).json({ message: "usuario borrado" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.verify = async(req, res, next) =>{
    try {
        const usuario = await Usuarios.findOne({_id: req.params.id});
        if(!usuario){
            return res.status(400).json({error: "error al encontrar usuario"})
        }

        const token = await Tokens.findOne({userID: usuario._id, token: req.params.token})
        if(!token){
            return res.status(401).json({error: "error al encontrar token"})
        }

        await usuario.updateOne({_id: usuario._id, verificado: true})

        return res.status(200).json({message: "verificacion completa"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "internal service error"});
    }
}

module.exports = controller;