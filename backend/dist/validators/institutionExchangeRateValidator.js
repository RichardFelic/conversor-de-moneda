"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutionExchangeRateValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Validación para crear o actualizar InstitutionExchangeRate
exports.institutionExchangeRateValidator = joi_1.default.object({
    currencyFrom: joi_1.default.string()
        .uppercase()
        .length(3)
        .required()
        .messages({
        'string.base': 'El campo currencyFrom debe ser un texto.',
        'string.length': 'El campo currencyFrom debe tener exactamente 3 caracteres.',
        'any.required': 'El campo currencyFrom es obligatorio.'
    }),
    currencyTo: joi_1.default.string()
        .uppercase()
        .length(3)
        .required()
        .messages({
        'string.base': 'El campo currencyTo debe ser un texto.',
        'string.length': 'El campo currencyTo debe tener exactamente 3 caracteres.',
        'any.required': 'El campo currencyTo es obligatorio.'
    }),
    exchangeRate: joi_1.default.number()
        .positive()
        .precision(4)
        .required()
        .messages({
        'number.base': 'El campo exchangeRate debe ser un número.',
        'number.positive': 'El campo exchangeRate debe ser un número positivo.',
        'number.precision': 'El campo exchangeRate debe tener un máximo de 4 decimales.',
        'any.required': 'El campo exchangeRate es obligatorio.'
    }),
    institution: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
        'string.pattern.base': 'El campo institution_id debe ser un ID de MongoDB válido.',
        'any.required': 'El campo institution_id es obligatorio.'
    }),
    update_date: joi_1.default.date()
        .optional()
        .default(() => new Date())
        .messages({
        'date.base': 'El campo update_date debe ser una fecha válida.'
    })
});
//# sourceMappingURL=institutionExchangeRateValidator.js.map