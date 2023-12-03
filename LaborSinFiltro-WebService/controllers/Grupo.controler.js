const grupo = require('../models/Group.model');
const Usuarios = require('../models/usuario.model')
const controller = {};

controller.saveGrupo = async (req, res, next) => {
    try{
        const {NombreGrupo, Empresa, Descripcion, grupoEmpresarial, priv} = req.body
        const {identifier} = req.params
        const {user} = req;

        let Grupo = await grupo.findById(identifier)

        if(!Grupo){
            Grupo = new grupo({
                NombreGrupo: NombreGrupo,
                creador: user,
                Empresa: Empresa,
                Descripcion: Descripcion,
                grupoEmpresarial: grupoEmpresarial,
                priv: priv
            })
        }

        const Gruposave = await Grupo.save()
        if(!Gruposave){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  empresa"})
        }
        return res.status(201).json(Gruposave)
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "internal service empresa"});
    }
}

controller.findall = async (req, res, next) => {
    try {
        const Grupo = await grupo.find({priv: false}).populate("Empresa", "Nombre correo").populate("creador" , "email username").populate("Integrantes", "username email")
        return res.status(200).json({ Grupo })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.findbyid = async (req, res, next) => {
    try {
        const {identifier} = req.params
        const Grupo = await grupo.findById(identifier).populate("Empresa", "Nombre correo").populate("creador" , "email username")
        if(!Grupo){
            return res.status(404).json({ error: "usuario not found" })
        }
        return res.status(200).json({ Grupo })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.adduser = async (req, res, next) => {
    try {
        const {groupID} = req.params
        const {user} = req
        const usuario = await Usuarios.findById(user)
            if(!usuario){
                return res.status(404).json({ error: "usuario not found" })
            }
        const Grupo = await grupo.findById(groupID)
            if(!Grupo){
                return res.status(404).json({ error: "usuario not found" })
            }

        let _integrantes = Grupo["Integrantes"] || []
        const alreadymember = _integrantes.findIndex(_i => _i.equals(user)) >= 0;

            if(alreadymember){
                _integrantes = _integrantes.filter(_i => !_i.equals(user))
            } else{
                _integrantes = [user, ..._integrantes]
            }

        Grupo["Integrantes"] = _integrantes
        const gruposave = Grupo.save()
        
            if(!gruposave){
                return res.status(401).json({ error: "error creating  post"})
            }

        let _gruposjoin = usuario["joinedgroups"] || []
        const alreadyjoin = _gruposjoin.findIndex(_i => _i.equals(Grupo._id)) >= 0;

            if(alreadyjoin){
                _gruposjoin = _gruposjoin.filter(_i => !_i.equals(Grupo._id))
            } else{
                _gruposjoin = [Grupo._id, ..._gruposjoin]
            }

        usuario["joinedgroups"] = _gruposjoin
        const usuariosave = usuario.save()
            if(!usuariosave){
                return res.status(401).json({ error: "error creating  post"})
            }
        return res.status(200).json({ Grupo })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
    

}

controller.addfav = async(req,res,next) => {
    try {
        const {groupID} = req.params
        const {user} = req
        const usuario = await Usuarios.findById(user)
            if(!usuario){
                return res.status(404).json({ error: "usuario not found" })
            }
        const Grupo = await grupo.findById(groupID)
            if(!Grupo){
                return res.status(404).json({ error: "usuario not found" })
            }
        let _gruposfav = usuario["gruposfav"] || []
        const alreadyfav = _gruposfav.findIndex(_i => _i.equals(Grupo._id)) >= 0;
            if(alreadyfav){
                _gruposfav = _gruposfav.filter(_i => !_i.equals(Grupo._id))
            } else{
                _gruposfav = [Grupo._id, ..._gruposfav]
            }
        usuario["gruposfav"] = _gruposfav 
        const usuariosave = usuario.save()
            if(!usuariosave){
                return res.status(401).json({ error: "error creating  post"})
            }
        let _favedby = Grupo["favedby"] || []
        const alreadyfavby = _favedby.findIndex(_i => _i.equals(user)) >= 0;

            if(alreadyfavby){
                _favedby = _favedby.filter(_i => !_i.equals(user))
            } else{
                _favedby = [user, ..._favedby]
            }

        Grupo["favedby"] = _favedby
        const gruposave = Grupo.save()
        
            if(!gruposave){
                return res.status(401).json({ error: "error creating  post"})
            }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

module.exports= controller