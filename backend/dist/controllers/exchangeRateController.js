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
exports.deleteExchangeRate = exports.updateExchangeRate = exports.getExchangeRateById = exports.getAllExchangeRates = exports.createExchangeRate = void 0;
const ExchangeRate_1 = __importDefault(require("../models/ExchangeRate"));
const ExchangeRateHistory_1 = __importDefault(require("../models/ExchangeRateHistory"));
// Helper function to handle responses
const handleResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
// Helper function to handle errors
const handleError = (res, error, message, statusCode) => {
    console.error(message, error);
    res.status(statusCode).json({ error: message });
};
// Registrar un cambio en el historial de tasas de cambio
const registerExchangeRateHistory = (currencyFrom, currencyTo, exchangeRate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historyEntry = new ExchangeRateHistory_1.default({
            currencyFrom,
            currencyTo,
            exchangeRate,
            date: new Date(),
        });
        yield historyEntry.save();
    }
    catch (error) {
        console.error("Error registering exchange rate history:", error);
    }
});
// Crear un nuevo registro de tasa de cambio
const createExchangeRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currencyFrom, currencyTo, exchangeRate } = req.body;
        // Verificar si ya existe un registro con la misma combinación de currencyFrom y currencyTo
        const existingRate = yield ExchangeRate_1.default.findOne({
            currencyFrom,
            currencyTo,
        });
        if (existingRate) {
            return handleError(res, null, "An exchange rate for this currency pair already exists", 400);
        }
        // Crear la nueva tasa de cambio
        const newExchangeRate = new ExchangeRate_1.default({
            currencyFrom,
            currencyTo,
            exchangeRate,
        });
        const savedExchangeRate = yield newExchangeRate.save();
        // Registrar en el historial
        yield registerExchangeRateHistory(currencyFrom, currencyTo, exchangeRate);
        handleResponse(res, 201, savedExchangeRate);
    }
    catch (error) {
        // Verificar si el error es de tipo 'Error' y tiene el código 11000 (duplicado de clave)
        if (error instanceof Error && error.code === 11000) {
            return handleError(res, error, "An exchange rate for this currency pair already exists", 400);
        }
        // Si no es un error de tipo MongoDB, manejar el error general
        handleError(res, error, "Error creating exchange rate", 500);
    }
});
exports.createExchangeRate = createExchangeRate;
// Obtener todas las tasas de cambio
const getAllExchangeRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchangeRates = yield ExchangeRate_1.default.find();
        handleResponse(res, 200, exchangeRates);
    }
    catch (error) {
        handleError(res, error, "Error fetching exchange rates", 500);
    }
});
exports.getAllExchangeRates = getAllExchangeRates;
// Obtener una tasa de cambio específica por su ID
const getExchangeRateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exchangeRate = yield ExchangeRate_1.default.findById(id);
        if (!exchangeRate) {
            return handleError(res, null, "Exchange rate not found", 404);
        }
        handleResponse(res, 200, exchangeRate);
    }
    catch (error) {
        handleError(res, error, "Error fetching exchange rate", 500);
    }
});
exports.getExchangeRateById = getExchangeRateById;
// Actualizar un registro de tasa de cambio
const updateExchangeRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { currencyFrom, currencyTo, exchangeRate } = req.body;
        // Verificar que el registro exista
        const existingRate = yield ExchangeRate_1.default.findById(id);
        if (!existingRate) {
            return handleError(res, null, "Exchange rate not found", 404);
        }
        // Verificar si existe otro registro con la misma combinación de currencyFrom y currencyTo
        const duplicateRate = yield ExchangeRate_1.default.findOne({
            currencyFrom,
            currencyTo,
            _id: { $ne: id }, // Excluir el registro actual de la búsqueda
        });
        if (duplicateRate) {
            return handleError(res, null, "An exchange rate for this currency pair already exists", 400);
        }
        // Actualizar los campos
        existingRate.currencyFrom = currencyFrom;
        existingRate.currencyTo = currencyTo;
        existingRate.exchangeRate = exchangeRate;
        existingRate.update_date = new Date();
        const updatedExchangeRate = yield existingRate.save();
        // Registrar en el historial
        yield registerExchangeRateHistory(currencyFrom, currencyTo, exchangeRate);
        handleResponse(res, 200, updatedExchangeRate);
    }
    catch (error) {
        handleError(res, error, "Error updating exchange rate", 500);
    }
});
exports.updateExchangeRate = updateExchangeRate;
// Eliminar un registro de tasa de cambio
const deleteExchangeRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedExchangeRate = yield ExchangeRate_1.default.findByIdAndDelete(id);
        if (!deletedExchangeRate) {
            return handleError(res, null, "Exchange rate not found", 404);
        }
        handleResponse(res, 200, { message: "Exchange rate deleted successfully" });
    }
    catch (error) {
        handleError(res, error, "Error deleting exchange rate", 500);
    }
});
exports.deleteExchangeRate = deleteExchangeRate;
/**
 * @swagger
 * components:
 *   schemas:
 *     ExchangeRate:
 *       type: object
 *       required:
 *         - currencyFrom
 *         - currencyTo
 *         - exchangeRate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the exchange rate
 *         currencyFrom:
 *           type: string
 *           description: Source currency
 *         currencyTo:
 *           type: string
 *           description: Target currency
 *         exchangeRate:
 *           type: number
 *           description: Exchange rate value
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the exchange rate
 */
//# sourceMappingURL=exchangeRateController.js.map