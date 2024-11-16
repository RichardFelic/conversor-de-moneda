"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const getAllowedOrigins = (origins) => (origin, callback) => {
    if (origins.includes(origin !== null && origin !== void 0 ? origin : '') || !origin) {
        callback(null, true); // Permitir la solicitud
    }
    else {
        callback(new Error('Not allowed by CORS')); // Denegar la solicitud
    }
};
exports.corsMiddleware = (0, cors_1.default)({
    origin: '*',
    optionsSuccessStatus: 200, // Para algunos navegadores
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});
//# sourceMappingURL=corsConfig.js.map