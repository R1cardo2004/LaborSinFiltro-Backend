const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reporteschema = new Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "publicaciones",
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    contenido:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("reportes", reporteschema)