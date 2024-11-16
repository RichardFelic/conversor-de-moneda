"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exchangeRateController_1 = require("../controllers/exchangeRateController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const roles_1 = require("../constants/roles");
const exchangeRateValidator_1 = require("../validators/exchangeRateValidator");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Exchange Rates
 *   description: API para manejo de tasas de cambios
 */
/**
 * @swagger
 * /api/exchange-rates:
 *   get:
 *     summary: obtener todas las tasas de cambio
 *     tags: [Exchange Rates]
 *     responses:
 *       200:
 *         description: List of exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExchangeRate'
 */
// Rutas de tasas de cambio
router.get("/", exchangeRateController_1.getAllExchangeRates); // Acceso público para ver todas las tasas de cambio
/**
 * @swagger
 * /api/exchange-rates/{id}:
 *   get:
 *     summary: obtener tasa de cambio por ID
 *     tags: [Exchange Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Exchange rate ID
 *     responses:
 *       200:
 *         description: Exchange rate found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: Exchange rate not found
 */
router.get("/:id", exchangeRateController_1.getExchangeRateById); // Acceso público para ver una tasa de cambio específica
// Rutas protegidas para crear, actualizar y eliminar tasas de cambio
router.use(authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)([roles_1.Roles.ADMIN])); // Middleware para proteger las siguientes rutas
/**
 * @swagger
 * /api/exchange-rates:
 *   post:
 *     summary: Crear nueva tasa de cambios
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRate'
 *     responses:
 *       201:
 *         description: Exchange rate created
 *       400:
 *         description: Bad request
 */
router.post("/", (0, validateRequest_1.validateRequest)(exchangeRateValidator_1.exchangeRateSchema), exchangeRateController_1.createExchangeRate);
/**
 * @swagger
 * /api/exchange-rates/{id}:
 *   put:
 *     summary: Actualizar tasa de cambio
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Exchange rate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRate'
 *     responses:
 *       200:
 *         description: Exchange rate updated
 *       404:
 *         description: Exchange rate not found
 */
router.put("/:id", (0, validateRequest_1.validateRequest)(exchangeRateValidator_1.exchangeRateSchema), exchangeRateController_1.updateExchangeRate);
/**
 * @swagger
 * /api/exchange-rates/{id}:
 *   delete:
 *     summary: Eliminar tasa de cambios
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Exchange rate ID
 *     responses:
 *       200:
 *         description: Exchange rate deleted
 *       404:
 *         description: Exchange rate not found
 */
router.delete("/:id", exchangeRateController_1.deleteExchangeRate);
exports.default = router;
//# sourceMappingURL=exchangeRateRoutes.js.map