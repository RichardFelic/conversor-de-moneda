"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRateHistory = void 0;
const ExchangeRateHistory_1 = __importDefault(require("../models/ExchangeRateHistory"));
// Controlador para obtener el historial de tasas de cambio
const getExchangeRateHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Consultar el historial de tasas de cambio ordenado por fecha de creación (o timestamp)
        const exchangeRateHistory = yield ExchangeRateHistory_1.default.find().sort({
            createdAt: -1,
        }); // Orden descendente por fecha de creación
        if (!exchangeRateHistory || exchangeRateHistory.length === 0) {
            res
                .status(404)
                .json({ message: "No se encontraron tasas de cambio en el historial" });
            return;
        }
        // Responder con el historial de tasas de cambio
        res.status(200).json(exchangeRateHistory);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener el historial de tasas de cambio",
            error,
        });
    }
});
exports.getExchangeRateHistory = getExchangeRateHistory;
/**
 * @swagger
 * components:
 *   schemas:
 *     ExchangeRateHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del historial de tasa de cambio
 *         currency:
 *           type: string
 *           description: La moneda para la que se registró la tasa de cambio
 *         rate:
 *           type: number
 *           format: float
 *           description: La tasa de cambio registrada
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del registro
 */
//# sourceMappingURL=exchangeRateHistoryController.js.map