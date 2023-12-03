
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const EmpresaSchema = new schema({
    Nombre: {
        type: String,
        required : true
    },
    correo: {
        type: String,
        required: true
    },
    empleados:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "usuarios",
        required: false,
        default: []
    }
},{timestamps: true});

module.exports = mongoose.model("empresas" , EmpresaSchema);