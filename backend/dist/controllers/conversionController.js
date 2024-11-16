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
exports.getConversionHistory = exports.logConversion = void 0;
const Conversion_1 = __importDefault(require("../models/Conversion"));
const ExchangeRate_1 = __importDefault(require("../models/ExchangeRate"));
const InstitutionExchangeRate_1 = __importDefault(require("../models/InstitutionExchangeRate"));
/**
 * Realiza una conversión de moneda.
 * @param req
 * @param res
 */
const logConversion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currencyFrom, currencyTo, amount, institution_exchange_rate_id } = req.body;
    // Convertir las monedas a mayúsculas
    const newCurrencyFrom = currencyFrom.toUpperCase();
    const newCurrencyTo = currencyTo.toUpperCase();
    try {
        let exchangeRate;
        let result;
        // Verificar si se proporciona un `institution_exchange_rate_id`
        if (institution_exchange_rate_id) {
            // Buscar en la colección InstitutionExchangeRate
            exchangeRate = yield InstitutionExchangeRate_1.default.findById(institution_exchange_rate_id)
                .where("currencyFrom")
                .equals(newCurrencyFrom)
                .where("currencyTo")
                .equals(newCurrencyTo);
            // Si no se encuentra la tasa de cambio de institución, retornar error
            if (!exchangeRate) {
                console.log(`No se encontró la tasa de cambio de institución con ID: ${institution_exchange_rate_id}`);
                res
                    .status(404)
                    .json({ message: "Tasa de cambio de institución no encontrada" });
                return; // Retornar aquí para evitar continuar la ejecución
            }
            else {
                console.log(`Tasa de cambio de institución encontrada: ${exchangeRate.exchangeRate}`);
            }
        }
        else {
            // Si no se proporciona `institution_exchange_rate_id`, buscar en ExchangeRate
            exchangeRate = yield ExchangeRate_1.default.findOne({
                currencyFrom: newCurrencyFrom,
                currencyTo: newCurrencyTo,
            });
            // Si no se encuentra la tasa de cambio estándar, retornar error
            if (!exchangeRate) {
                console.log(`No se encontró la tasa de cambio estándar para ${newCurrencyFrom} a ${newCurrencyTo}`);
                res
                    .status(404)
                    .json({ message: "Tasa de cambio estándar no encontrada" });
                return; // Retornar aquí para evitar continuar la ejecución
            }
            else {
                console.log(`Tasa de cambio estándar encontrada: ${exchangeRate.exchangeRate}`);
            }
        }
        // Realizar la conversión con la tasa de cambio encontrada
        result = amount * exchangeRate.exchangeRate;
        // Crear una nueva conversión
        const conversion = new Conversion_1.default({
            currencyFrom: newCurrencyFrom,
            currencyTo: newCurrencyTo,
            amount,
            result,
            exchange_rate_id: institution_exchange_rate_id
                ? undefined
                : exchangeRate._id,
            institution_exchange_rate_id: institution_exchange_rate_id
                ? exchangeRate._id
                : undefined,
        });
        // Guardar la conversión
        const savedConversion = yield conversion.save();
        res.status(200).json(savedConversion);
        return; // Retornar aquí también para indicar que hemos terminado
    }
    catch (error) {
        console.error("Error en la conversión:", error);
        res.status(500).json({ message: "Error al realizar la conversión", error });
        return; // Retornar aquí para evitar seguir ejecutando después del error
    }
});
exports.logConversion = logConversion;
/**
 * Obtiene el historial de conversiones (solo para ADMIN).
 * @param req
 * @param res
 */
// Controlador para obtener el historial de conversiones (solo para ADMIN)
const getConversionHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todas las conversiones ordenadas por fecha de creación en orden descendente
        const conversions = yield Conversion_1.default.find().sort({ createdAt: -1 });
        if (!conversions || conversions.length === 0) {
            res
                .status(404)
                .json({ message: "No se encontró historial de conversiones" });
            return;
        }
        // Responder con el historial de conversiones
        res.status(200).json(conversions);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener el historial de conversiones",
            error,
        });
    }
});
exports.getConversionHistory = getConversionHistory;
/**
 * @swagger
 * components:
 *   schemas:
 *     Conversion:
 *       type: object
 *       properties:
 *         currencyFrom:
 *           type: string
 *         currencyTo:
 *           type: string
 *         amount:
 *           type: number
 *         result:
 *           type: number
 *         exchange_rate_id:
 *           type: string
 *         institution_exchange_rate_id:
 *           type: string
 */
//# sourceMappingURL=conversionController.js.map