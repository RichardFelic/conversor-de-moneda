"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exchangeRateHistoryController_1 = require("../controllers/exchangeRateHistoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const roles_1 = require("../constants/roles");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: ExchangeRateHistory
 *   description: Endpoints para historial de tasas de cambio
 */
/**
 * @swagger
 * /api/exchange-rate-history:
 *   get:
 *     summary: Obtener todo el historial de tasas de cambio
 *     tags: [ExchangeRateHistory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tasas de cambio en el historial
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64d9f8123e7a4b3e8f9c8a73"
 *                   currencyFrom:
 *                     type: string
 *                     example: "USD"
 *                   currencyTo:
 *                     type: string
 *                     example: "EUR"
 *                   exchangeRate:
 *                     type: number
 *                     example: 0.89
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-01T14:35:00Z"
 *       404:
 *         description: No se encontraron tasas de cambio en el historial
 *       500:
 *         description: Error al obtener el historial de tasas de cambio
 */
// Rutas públicas para obtener el historial de tasas de cambio
router.get("/", authMiddleware_1.authMiddleware, exchangeRateHistoryController_1.getExchangeRateHistory); // Ver todo el historial de tasas de cambio
// router.get('/:id', getExchangeRateHistoryById); // Ver historial de una tasa de cambio específica
// Rutas protegidas para acceder a los historiales (solo ADMIN)
router.use(authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)([roles_1.Roles.ADMIN])); // Middleware para proteger las siguientes rutas
// Exportar las rutas
exports.default = router;
//# sourceMappingURL=exchangeRateHistoryRoutes.js.map