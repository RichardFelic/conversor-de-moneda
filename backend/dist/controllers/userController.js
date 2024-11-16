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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.confirmEmail = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const mailer_1 = require("../utils/mailer"); // Importar el servicio de correo
const roles_1 = require("../constants/roles");
// Helper function to handle responses
const handleResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
// Helper function to handle errors
const handleError = (res, error, message, statusCode) => {
    console.error(message, error);
    res.status(statusCode).json({ error: message });
};
// Hash password function
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
// Validate password function
const validatePassword = (inputPassword, storedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(inputPassword, storedPassword);
});
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, name, role } = req.body;
    try {
        const hashedPassword = yield hashPassword(password);
        const user = new User_1.default({
            username,
            password: hashedPassword,
            email,
            name,
            role: role || roles_1.Roles.USER,
        });
        yield user.save();
        // Enviar el correo de confirmación
        yield (0, mailer_1.sendConfirmationEmail)(user.email, user._id.toString());
        handleResponse(res, 201, {
            message: "Usuario registrado exitosamente. Por favor, confirma tu correo.",
        });
    }
    catch (error) {
        handleError(res, error, "Error al registrar el usuario", 500);
    }
});
exports.registerUser = registerUser;
// Confirm email
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            handleError(res, new Error("Usuario no encontrado"), "Usuario no encontrado", 404);
            return;
        }
        if (user.isConfirmed) {
            handleResponse(res, 200, { message: "El correo ya ha sido confirmado." });
            return;
        }
        user.isConfirmed = true;
        yield user.save();
        handleResponse(res, 200, { message: "Correo confirmado exitosamente." });
    }
    catch (error) {
        handleError(res, error, "Error al confirmar el correo", 500);
    }
});
exports.confirmEmail = confirmEmail;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            handleError(res, new Error("Usuario no encontrado"), "Usuario no encontrado", 404);
            return;
        }
        if (!user.isConfirmed) {
            handleError(res, new Error("Correo no confirmado"), "Correo no confirmado", 403);
            return;
        }
        const isPasswordValid = yield validatePassword(password, user.password);
        if (!isPasswordValid) {
            handleError(res, new Error("Contraseña incorrecta"), "Contraseña incorrecta", 403);
            return;
        }
        const token = (0, jwt_1.generateToken)(user._id.toString());
        handleResponse(res, 200, {
            message: "Inicio de sesión exitoso",
            token,
            role: user.role,
        });
    }
    catch (error) {
        handleError(res, error, "Error al iniciar sesión, intente mas tarde", 500);
    }
});
exports.loginUser = loginUser;
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        if (!users) {
            handleError(res, new Error("No se encontraron usuarios"), "No se encontraron usuarios", 404);
            return;
        }
        handleResponse(res, 200, users);
    }
    catch (error) {
        handleError(res, error, "Error al obtener los usuarios", 500);
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            handleError(res, new Error("Usuario no encontrado"), "Usuario no encontrado", 404);
            return;
        }
        handleResponse(res, 200, user);
    }
    catch (error) {
        handleError(res, error, "Error al obtener el usuario", 500);
    }
});
exports.getUserById = getUserById;
// Update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, rest, {
            new: true,
        });
        if (!updatedUser) {
            handleError(res, new Error("Usuario no encontrado"), "Usuario no encontrado", 404);
            return;
        }
        handleResponse(res, 200, updatedUser);
    }
    catch (error) {
        handleError(res, error, "Error al actualizar el usuario", 500);
    }
});
exports.updateUser = updateUser;
// Delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            handleError(res, new Error("Usuario no encontrado"), "Usuario no encontrado", 404);
            return;
        }
        res.sendStatus(204);
    }
    catch (error) {
        handleError(res, error, "Error al eliminar el usuario, intente de nuevo mas tarde", 500);
    }
});
exports.deleteUser = deleteUser;
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:

 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *           description: Rol del usuario
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */
//# sourceMappingURL=userController.js.map