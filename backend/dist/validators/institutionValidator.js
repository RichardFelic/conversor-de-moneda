"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const stringRequired = (label) => ({
    'string.base': `${label} debe ser una cadena de texto.`,
    'string.empty': `${label} no puede estar vacío.`,
    'any.required': `${label} es un campo obligatorio.`
});
const stringMin = (label, limit) => ({
    'string.min': `${label} debe tener al menos ${limit} caracteres.`
});
const stringMax = (label, limit) => ({
    'string.max': `${label} no puede tener más de ${limit} caracteres.`
});
exports.institutionSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(100)
        .required()
        .messages(Object.assign(Object.assign(Object.assign({}, stringRequired('Nombre')), stringMin('Nombre', 3)), stringMax('Nombre', 100))),
    country: joi_1.default.string()
        .optional()
        .allow(null, '')
        .messages({
        'string.base': 'El país debe ser una cadena de texto o estar vacío.'
    }),
    img: joi_1.default.string()
        .optional()
        .allow(null, '')
        .messages({
        'string.base': 'Se necesita una dirección de imagen válida'
    })
});
//# sourceMappingURL=institutionValidator.js.map