"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const stringRequired = (label) => ({
    'string.base': `${label} debe ser una cadena.`,
    'string.required': `${label} es requerido.`,
});
const stringMin = (label, min) => ({
    'string.min': `${label} debe tener al menos ${min} caracteres.`,
});
const stringMax = (label, max) => ({
    'string.max': `${label} debe tener un máximo de ${max} caracteres.`,
});
exports.userSchema = joi_1.default.object({
    username: joi_1.default.string().alphanum().min(3).max(20).required().messages(Object.assign(Object.assign(Object.assign(Object.assign({}, stringRequired('Nombre de usuario')), { 'string.alphanum': 'El nombre de usuario solo debe contener caracteres alfanuméricos.' }), stringMin('Nombre de usuario', 3)), stringMax('Nombre de usuario', 20))),
    password: joi_1.default.string().min(8).required().messages(Object.assign(Object.assign({}, stringRequired('Contraseña')), stringMin('Contraseña', 8))),
    email: joi_1.default.string().email().required().messages(stringRequired('Correo electrónico')),
    name: joi_1.default.string().min(3).max(50).required().messages(Object.assign(Object.assign(Object.assign({}, stringRequired('Nombre')), stringMin('Nombre', 3)), stringMax('Nombre', 50))),
    role: joi_1.default.string().valid('user', 'admin').optional().messages({
        'any.only': 'El rol debe ser "user" o "admin".',
    }),
});
exports.authSchema = joi_1.default.object({
    username: joi_1.default.string().required().messages(stringRequired('Nombre de usuario')),
    password: joi_1.default.string().min(8).required().messages(stringRequired('Contraseña')),
});
//# sourceMappingURL=userValidator.js.map