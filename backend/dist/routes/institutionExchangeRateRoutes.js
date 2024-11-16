"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institutionExchangeRateController_1 = require("../controllers/institutionExchangeRateController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const roles_1 = require("../constants/roles");
// import { institutionExchangeRateSchema } from '../validators/institutionExchangeRateValidator';
const validateRequest_1 = require("../middleware/validateRequest");
const institutionExchangeRateValidator_1 = require("../validators/institutionExchangeRateValidator");
const router = (0, express_1.Router)();
// Rutas protegidas para crear, actualizar y eliminar tasas de cambio de institución
router.use(authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)([roles_1.Roles.ADMIN])); // Middleware para proteger las siguientes rutas
/**
 * @swagger
 * /api/institutions-exchange-rates:
 *   get:
 *     summary: Obtener todas las tasas de cambio de instituciones
 *     tags: [Institution Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las tasas de cambio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InstitutionExchangeRate'
 *       500:
 *         description: Error al obtener las tasas de cambio
 */
router.get("/", institutionExchangeRateController_1.getAllInstitutionExchangeRates); // Ver todas las tasas de cambio para instituciones
/**
 * @swagger
 * /api/institutions-exchange-rates/{id}:
 *   get:
 *     summary: Obtener una tasa de cambio específica por su ID
 *     tags: [Institution Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tasa de cambio
 *     responses:
 *       200:
 *         description: Tasa de cambio obtenida con éxito
 *       404:
 *         description: Tasa de cambio no encontrada
 *       500:
 *         description: Error al obtener la tasa de cambio
 */
router.get("/:id", institutionExchangeRateController_1.getInstitutionExchangeRateById); // Ver una tasa de cambio específica para institución
/**
 * @swagger
 * /api/institutions-exchange-rates:
 *   post:
 *     summary: Crear una nueva tasa de cambio para una institución
 *     tags: [Institution Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstitutionExchangeRate'
 *     responses:
 *       201:
 *         description: Tasa de cambio creada con éxito
 *       400:
 *         description: La tasa de cambio para este par de monedas ya existe para esta institución
 *       404:
 *         description: Institución no encontrada
 *       500:
 *         description: Error al crear la tasa de cambio
 */
router.post("/", (0, validateRequest_1.validateRequest)(institutionExchangeRateValidator_1.institutionExchangeRateValidator), institutionExchangeRateController_1.createInstitutionExchangeRate); // Crear tasa de cambio específica de institución
/**
 * @swagger
 * /api/institutions-exchange-rates/{id}:
 *   put:
 *     summary: Actualizar una tasa de cambio específica por su ID
 *     tags: [Institution Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tasa de cambio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstitutionExchangeRate'
 *     responses:
 *       200:
 *         description: Tasa de cambio actualizada con éxito
 *       400:
 *         description: Ya existe una tasa de cambio para este par de monedas
 *       404:
 *         description: Tasa de cambio no encontrada
 *       500:
 *         description: Error al actualizar la tasa de cambio
 */
router.put("/:id", (0, validateRequest_1.validateRequest)(institutionExchangeRateValidator_1.institutionExchangeRateValidator), institutionExchangeRateController_1.updateInstitutionExchangeRate); // Actualizar tasa de cambio específica de institución
/**
 * @swagger
 * /api/institutions-exchange-rates/{id}:
 *   delete:
 *     summary: Eliminar una tasa de cambio específica por su ID
 *     tags: [Institution Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tasa de cambio a eliminar
 *     responses:
 *       200:
 *         description: Tasa de cambio eliminada con éxito
 *       404:
 *         description: Tasa de cambio no encontrada
 *       500:
 *         description: Error al eliminar la tasa de cambio
 */
router.delete("/:id", institutionExchangeRateController_1.deleteInstitutionExchangeRate); // Eliminar tasa de cambio específica de institución
// Exportar las rutas
exports.default = router;
//# sourceMappingURL=institutionExchangeRateRoutes.js.map