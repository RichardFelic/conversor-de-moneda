"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role || '')) {
            res.status(403).json({ message: 'Acceso denegado' });
            return; // Asegúrate de terminar el flujo aquí
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=roleMiddleware.js.map