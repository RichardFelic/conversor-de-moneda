import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
// import Conversion from "../models/Conversion";
import { conversionSchema } from "../validators/conversionValidator";
import {
  getConversionHistory,
  logConversion,
} from "../controllers/conversionController";
import { validateRequest } from "../middleware/validateRequest";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Roles } from "../constants/roles";

const router = Router();
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
router.post("/convert", validateRequest(conversionSchema), logConversion);

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
router.use(authMiddleware, roleMiddleware([Roles.ADMIN || Roles.USER]));
router.get("/history", getConversionHistory);

export default router;
