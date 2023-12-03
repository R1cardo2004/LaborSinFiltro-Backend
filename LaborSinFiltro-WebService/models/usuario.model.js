const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypto = require('crypto')
const debug = require('debug')('app:usermodel')

const userSchema = new schema({
    email: {
        type: String,
        trim: true,
        required : true,
        unique: true
    },
    username: {
        type: String,
        required : true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashedpassword: {
        type: String,
        required : true
    },
    token:{
        type: [String],
        default: []
    },
    salt:{
        type: String
    },
    verificado:{
        type: Boolean,
        default: false
    },
    empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "empresas",
        required: false,
    },
    joinedgroups:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Grupos",
        required: false,
        default: []
    },
    gruposfav:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Grupos",
        required: false,
        default: []
    }
},{timestamps: true});

userSchema.methods = {
    encryptedpassword: function(password) {
        if(!password) return "";
        try {
            const _passwrd = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000 , 64,
                'sha512'
            ).toString("hex")
            return _passwrd;
        } catch (error) {
            debug(error);
            return "";
        }

    }, 
    MakeSalt: function() {
        return crypto.randomBytes(16).toString("hex")
    },
    comprarePasswrd: function(password){
        return this.hashedpassword === this.encryptedpassword(password)
    }
}

userSchema
    .virtual("password")
    .set(function(password = crypto.randomBytes(16).toString()){
        this.salt = this.MakeSalt();
        this.hashedpassword = this.encryptedpassword(password)
    })

module.exports = mongoose.model("usuarios" , userSchema);

