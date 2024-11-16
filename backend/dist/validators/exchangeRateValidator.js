"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Definir mensajes personalizados para cada campo
const currencyString = (label) => ({
    'string.base': `${label} debe ser una cadena de texto.`,
    'any.required': `${label} es un campo obligatorio.`,
    'string.pattern.base': `${label} debe estar en formato de 3 letras mayúsculas, por ejemplo, USD.`,
});
const exchangeRateNumber = (label) => ({
    'number.base': `${label} debe ser un número.`,
    'number.min': `${label} debe ser mayor o igual a 0.`,
    'any.required': `${label} es un campo obligatorio.`,
});
// Esquema de validación
exports.exchangeRateSchema = joi_1.default.object({
    currencyFrom: joi_1.default.string()
        .uppercase()
        .pattern(/^[A-Z]{3}$/)
        .required()
        .messages(currencyString('La moneda de origen')),
    currencyTo: joi_1.default.string()
        .uppercase()
        .pattern(/^[A-Z]{3}$/)
        .required()
        .messages(currencyString('La moneda de destino')),
    exchangeRate: joi_1.default.number()
        .min(0)
        .required()
        .messages(exchangeRateNumber('La tasa de cambio'))
});
//# sourceMappingURL=exchangeRateValidator.js.map