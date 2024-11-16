import { Router } from "express";
import {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
} from "../controllers/institutionController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Roles } from "../constants/roles";
// import { institutionSchema } from '../validators/institutionValidator';
import { validateRequest } from "../middleware/validateRequest";
import { institutionSchema } from "../validators/institutionValidator";

const router = Router();

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
router.use(authMiddleware, roleMiddleware([Roles.ADMIN || Roles.USER])); // Middleware para proteger las siguientes rutas

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

router.get("/", getAllInstitutions); // Acceso público para obtener todas las instituciones

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

router.get("/:id", getInstitutionById); // Acceso público para obtener una institución específica

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

router.post("/", validateRequest(institutionSchema), createInstitution);

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

router.put("/:id", validateRequest(institutionSchema), updateInstitution);

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

router.delete("/:id", deleteInstitution);

export default router;
