"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateHistoryValidator = void 0;
// src/validators/exchangeRateHistoryValidator.ts
const joi_1 = __importDefault(require("joi"));
exports.exchangeRateHistoryValidator = joi_1.default.object({
    currencyFrom: joi_1.default.string()
        .uppercase() // Convertir a mayúsculas automáticamente
        .length(3) // Código de moneda de 3 caracteres
        .required()
        .messages({
        'string.base': 'El tipo de cambio inicial debe ser un texto.',
        'string.length': 'El tipo de cambio inicial debe tener exactamente 3 caracteres.',
        'any.required': 'El tipo de cambio inicial es requerido.'
    }),
    currencyTo: joi_1.default.string()
        .uppercase() // Convertir a mayúsculas automáticamente
        .length(3) // Código de moneda de 3 caracteres
        .required()
        .messages({
        'string.base': 'El tipo de cambio final debe ser un texto.',
        'string.length': 'El tipo de cambio final debe tener exactamente 3 caracteres.',
        'any.required': 'El tipo de cambio final es requerido.'
    }),
    exchangeRate: joi_1.default.number()
        .positive() // Valor positivo
        .precision(6) // Hasta 6 decimales para precisión
        .required()
        .messages({
        'number.base': 'La tasa de cambio debe ser un número.',
        'number.positive': 'La tasa de cambio debe ser un número positivo.',
        'any.required': 'La tasa de cambio es requerida.'
    }),
    institution: joi_1.default.string()
        .optional()
        .pattern(/^[a-fA-F0-9]{24}$/) // Validación para un ObjectId de MongoDB
        .messages({
        'string.base': 'La institución debe ser un identificador válido.',
        'string.pattern.base': 'La institución debe ser un ID válido de MongoDB.'
    }),
    date: joi_1.default.date()
        .default(() => new Date())
        .messages({
        'date.base': 'La fecha debe ser válida.'
    }),
});
//# sourceMappingURL=exchangeRateHistoryValidator.js.map