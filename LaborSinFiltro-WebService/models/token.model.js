
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenschema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "usuarios",
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 9000
    }
})

module.exports = mongoose.model("token", tokenschema)