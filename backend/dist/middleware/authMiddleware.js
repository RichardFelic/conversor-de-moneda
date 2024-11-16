"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Obtén el token sin el prefijo "Bearer"
    if (!token) {
        res.status(403).json({ message: 'Token requerido' });
        return;
    }
    try {
        // Verificar y decodificar el token
        const decoded = (0, jwt_1.verifyToken)(token);
        req.userId = decoded.id;
        // Buscar al usuario en la base de datos
        const user = yield User_1.default.findById(req.userId);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Verificar si el correo ha sido confirmado
        if (!user.isConfirmed) {
            res.status(403).json({ message: 'Correo no confirmado' });
            return;
        }
        // Almacenar el rol del usuario para futuros permisos
        req.role = user.role;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map