const empresa = require('../models/Empresa.model');
const Usuarios = require('../models/usuario.model')
const controller = {};

controller.saveEmpresa = async (req, res, next) => {
    try{
        const {Nombre, correo} = req.body
        const {identifier} = req.params

        let Empresa = await empresa.findById(identifier)

        if(!Empresa){
            Empresa = new empresa({
                Nombre: Nombre,
                correo: correo,                
            })
        }

        const Empresasave = await Empresa.save()
        if(!Empresasave){
            console.log("conflicto");
            return res.status(401).json({ error: "error creating  empresa"})
        }
        return res.status(201).json(Empresasave)
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "internal service empresa"});
    }
}

controller.findall = async (req, res, next) => {
    try {
        const Empresa = await empresa.find({}).populate("empleados", "email")
        return res.status(200).json({ Empresa })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"});
    }
}

controller.addUser = async (req, res, next) => {
    try {
        const {empresaID} = req.params
        const {user} = req;
        const usuario = await Usuarios.findById(user)
        if(!usuario){
            return res.status(404).json({ error: "usuario not found" })
        }
        const Empresa = await empresa.findById(empresaID)
        if(!Empresa){
            return res.status(404).json({ error: "usuario not found" })
        }
        await usuario.updateOne({_id: usuario._id, empresa: Empresa._id})
        let _empleados = Empresa["empleados"] || [];
        _empleados = [user, ..._empleados]
        Empresa["empleados"] = _empleados
        const empresasave = Empresa.save()

        if(!empresasave){
            return res.status(401).json({ error: "error create empleado"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal service error"}); 
    }
}

module.exports= controller