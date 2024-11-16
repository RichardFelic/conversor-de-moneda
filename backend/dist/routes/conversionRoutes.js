"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
// import Conversion from "../models/Conversion";
const conversionValidator_1 = require("../validators/conversionValidator");
const conversionController_1 = require("../controllers/conversionController");
const validateRequest_1 = require("../middleware/validateRequest");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const roles_1 = require("../constants/roles");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Conversion
 *   description: Rutas para conversiones de monedas
 */
/**
 * @swagger
 * /api/conversions/convert:
 *   post:
 *     summary: Realiza una conversión de moneda
 *     tags: [Conversion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currencyFrom:
 *                 type: string
 *                 example: "USD"
 *               currencyTo:
 *                 type: string
 *                 example: "EUR"
 *               amount:
 *                 type: number
 *                 example: 100
 *               institution_exchange_rate_id:
 *                 type: string
 *                 example: "64b0fbc3a16e5c9b9c83459a"
 *     responses:
 *       200:
 *         description: Conversión realizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currencyFrom:
 *                   type: string
 *                 currencyTo:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 result:
 *                   type: number
 *                 exchange_rate_id:
 *                   type: string
 *                 institution_exchange_rate_id:
 *                   type: string
 *       404:
 *         description: Tasa de cambio no encontrada
 *       500:
 *         description: Error al realizar la conversión
 */
// Rutas de conversion
router.post("/convert", (0, validateRequest_1.validateRequest)(conversionValidator_1.conversionSchema), conversionController_1.logConversion);
/**
 * @swagger
 * /api/conversions/history:
 *   get:
 *     summary: Obtener historial de conversiones
 *     tags: [Conversion]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de conversiones recuperado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   currencyFrom:
 *                     type: string
 *                   currencyTo:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   result:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No se encontró historial de conversiones
 *       500:
 *         description: Error al obtener el historial de conversiones
 */
// Ruta para obtener el historial de conversiones (solo para ADMIN)
router.use(authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)([roles_1.Roles.ADMIN || roles_1.Roles.USER]));
router.get("/history", conversionController_1.getConversionHistory);
exports.default = router;
//# sourceMappingURL=conversionRoutes.js.map