
const {body, param} = require('express-validator');
const validators = {};

validators.CrearPostValidator = [
    param("identifier")
    .optional()
    .isMongoId().withMessage("ingrese un id valido"),
    body("titulo")
    .notEmpty().withMessage("titulo require texto"),
    body("texto")
    .notEmpty().withMessage("la publicacion requiere texto")
    .isLength({max: 280}).withMessage("maximo de characteres alcanzado")
]

validators.findByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("identifier es nulo")
        .isMongoId().withMessage("ingrese un mongoidvalido")
]

module.exports = validators