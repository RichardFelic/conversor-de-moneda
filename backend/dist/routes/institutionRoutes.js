"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institutionController_1 = require("../controllers/institutionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const roles_1 = require("../constants/roles");
// import { institutionSchema } from '../validators/institutionValidator';
const validateRequest_1 = require("../middleware/validateRequest");
const institutionValidator_1 = require("../validators/institutionValidator");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Institutions
 *   description: Gestión de instituciones
 */
/**
 * @swagger
 * tags:
 *   name: Institutions
 *   description: Gestión de instituciones
 */
// Rutas protegidas para crear, actualizar y eliminar instituciones
router.use(authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)([roles_1.Roles.ADMIN || roles_1.Roles.USER])); // Middleware para proteger las siguientes rutas
/**
 * @swagger
 * /api/institutions:
 *   get:
 *     summary: Obtener todas las instituciones
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las instituciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Institution'
 */
router.get("/", institutionController_1.getAllInstitutions); // Acceso público para obtener todas las instituciones
/**
 * @swagger
 * /api/institutions/{id}:
 *   get:
 *     summary: Obtener una institución por ID
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución
 *     responses:
 *       200:
 *         description: Institución encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       404:
 *         description: Institución no encontrada
 */
router.get("/:id", institutionController_1.getInstitutionById); // Acceso público para obtener una institución específica
/**
 * @swagger
 * /api/institutions:
 *   post:
 *     summary: Crear una nueva institución
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institution'
 *     responses:
 *       201:
 *         description: Institución creada
 *       409:
 *         description: La institución ya existe
 */
router.post("/", (0, validateRequest_1.validateRequest)(institutionValidator_1.institutionSchema), institutionController_1.createInstitution);
/**
 * @swagger
 * /api/institutions/{id}:
 *   put:
 *     summary: Actualizar una institución
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institution'
 *     responses:
 *       200:
 *         description: Institución actualizada
 *       404:
 *         description: Institución no encontrada
 */
router.put("/:id", (0, validateRequest_1.validateRequest)(institutionValidator_1.institutionSchema), institutionController_1.updateInstitution);
/**
 * @swagger
 * /api/institutions/{id}:
 *   delete:
 *     summary: Eliminar una institución
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución
 *     responses:
 *       204:
 *         description: Institución eliminada
 *       404:
 *         description: Institución no encontrada
 */
router.delete("/:id", institutionController_1.deleteInstitution);
exports.default = router;
//# sourceMappingURL=institutionRoutes.js.map