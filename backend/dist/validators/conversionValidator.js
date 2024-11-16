"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Validación para el campo de moneda (currencyFrom, currencyTo)
const currencyString = (label) => ({
    'string.base': `${label} debe ser una cadena.`,
    'any.required': `${label} es obligatoria.`,
    'string.regex': `${label} debe ser una cadena de 3 letras en mayúsculas.`,
});
// Validación para el campo de cantidad (amount)
const amountNumber = (label) => ({
    'number.base': `${label} debe ser un número.`,
    'number.min': `${label} debe ser mayor a 0.`,
    'any.required': `${label} es obligatoria.`,
});
// Definir el esquema de validación para Conversion sin el campo result
exports.conversionSchema = joi_1.default.object({
    currencyFrom: joi_1.default.string()
        .uppercase()
        .regex(/^[A-Z]{3}$/)
        .required()
        .messages(currencyString('La moneda de origen')),
    currencyTo: joi_1.default.string()
        .uppercase()
        .regex(/^[A-Z]{3}$/)
        .required()
        .messages(currencyString('La moneda de destino')),
    amount: joi_1.default.number()
        .positive()
        .required()
        .messages(amountNumber('La cantidad')),
    institution: joi_1.default.string() // Agregamos este campo para permitir "institution"
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional()
        .messages({
        'string.base': 'El ID de la institución debe ser una cadena.',
        'string.pattern.base': 'El ID de la institución debe ser un ObjectId válido.',
    }),
    exchange_rate_id: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional()
        .messages({
        'string.base': 'El ID de la tasa de cambio debe ser una cadena.',
        'string.pattern.base': 'El ID de la tasa de cambio debe ser un ObjectId válido.',
    }),
    institution_exchange_rate_id: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional()
        .messages({
        'string.base': 'El ID de la tasa de cambio de la institución debe ser una cadena.',
        'string.pattern.base': 'El ID de la tasa de cambio de la institución debe ser un ObjectId válido.',
    }),
});
//# sourceMappingURL=conversionValidator.js.map