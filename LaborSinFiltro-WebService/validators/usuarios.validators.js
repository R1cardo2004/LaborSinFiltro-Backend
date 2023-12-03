const {body, param, check} = require('express-validator');
const validators = {};

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

validators.CrearUsuarioValidator = [
    param("identifier")
    .optional()
    .isMongoId().withMessage("ingrese un id valido")
    .trim(),
    body("email")
    .notEmpty().withMessage("titulo require texto")
    .isEmail().withMessage("ingrese un email valido")
    .trim(),
    body("username")
    .notEmpty().withMessage("la publicacion requiere texto")
    .trim(),
    body("password")
    .notEmpty().withMessage(" la contrasenia es necesaria")
    .matches(passwordRegex).withMessage("la contrasenia requiere por lo menos un character especial, una mayuscula y una minuscula")
    .trim(),   
]

validators.findByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("identifier es nulo")
        .isMongoId().withMessage("ingrese un mongoidvalido")
]

module.exports = validators