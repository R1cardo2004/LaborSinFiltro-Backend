
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const GroupSchema = new schema({
    NombreGrupo: {
        type: String,
        required : true
    },
    Descripcion: {
        type: String,
        required : false
    },
    Empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "empresas",
        required : false
    },
    Integrantes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "usuarios",
        required: false,
        default: []
    },
    moderadores:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "usuarios",
        required: false,
        default: []

    },
    administradores:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "usuarios",
        required: false,
        default: []
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required : true
    },
    grupoEmpresarial: {
        type: Boolean,
        default: false
    },
    priv:{
        type: Boolean,
        default: false
    },
    favedby:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "usuarios",
        required: false,
        default: []
    }
},{timestamps: true});

module.exports = mongoose.model("Grupos" , GroupSchema);