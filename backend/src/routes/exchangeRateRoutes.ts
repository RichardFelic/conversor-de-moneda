import { Router } from "express";
import {
  createExchangeRate,
  getAllExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
} from "../controllers/exchangeRateController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Roles } from "../constants/roles";
import { exchangeRateSchema } from "../validators/exchangeRateValidator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

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
router.get("/", getAllExchangeRates); // Acceso público para ver todas las tasas de cambio

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

router.get("/:id", getExchangeRateById); // Acceso público para ver una tasa de cambio específica

// Rutas protegidas para crear, actualizar y eliminar tasas de cambio
router.use(authMiddleware, roleMiddleware([Roles.ADMIN])); // Middleware para proteger las siguientes rutas

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

router.post("/", validateRequest(exchangeRateSchema), createExchangeRate);

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

router.put("/:id", validateRequest(exchangeRateSchema), updateExchangeRate);

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

router.delete("/:id", deleteExchangeRate);
export default router;
