
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trendsschema = new Schema({
    tag: {
        type: String,
        required: flase
    }
})

module.exports = mongoose.model("trends", trendsschema)