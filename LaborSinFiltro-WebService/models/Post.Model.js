
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    titulo: {
        type: String,
        required : true
    },
    texto: {
        type: String,
        required : true
    },
    tags: {
        type: [{
            content: {
                type: [String],
                required: false
            }
        }]
    },
    autor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    likes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "usuarios",
        required: false,
        default: []

    },
    grupo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grupos",
        required: false
    },
    hideUser:{
        type: Boolean,
        default: false
    },
    comments: {
        type: [{
            user:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
            required: true,
            },
            content:{
                type: String,
                required: true
            },
            timestamp:{
                type: Date,
                required:true
            }
        }],
        default: []
    }
},{timestamps: true});

module.exports = mongoose.model("publicaciones" , postSchema);