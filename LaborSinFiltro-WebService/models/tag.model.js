
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trendsschema = new Schema({
    tag: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("trends", trendsschema)