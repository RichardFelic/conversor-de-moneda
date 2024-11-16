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
exports.deleteInstitutionExchangeRate = exports.updateInstitutionExchangeRate = exports.getInstitutionExchangeRateById = exports.getAllInstitutionExchangeRates = exports.createInstitutionExchangeRate = void 0;
const InstitutionExchangeRate_1 = __importDefault(require("../models/InstitutionExchangeRate"));
const ExchangeRateHistory_1 = __importDefault(require("../models/ExchangeRateHistory"));
const Institution_1 = __importDefault(require("../models/Institution"));
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
const registerExchangeRateHistory = (currencyFrom, currencyTo, exchangeRate, institution) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historyEntry = new ExchangeRateHistory_1.default({
            currencyFrom,
            currencyTo,
            exchangeRate,
            institution,
            date: new Date(),
        });
        yield historyEntry.save();
    }
    catch (error) {
        console.error("Error registering exchange rate history:", error);
    }
});
// Crear un nuevo registro de tasa de cambio de institución
const createInstitutionExchangeRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currencyFrom, currencyTo, exchangeRate, institution } = req.body;
        // Verificar que la institución exista
        const institutionExists = yield Institution_1.default.findById(institution);
        if (!institutionExists) {
            return handleError(res, null, "Institution not found", 404);
        }
        // Verificar si ya existe un registro con la misma combinación de currencyFrom, currencyTo e institution
        const existingRate = yield InstitutionExchangeRate_1.default.findOne({
            currencyFrom,
            currencyTo,
            institution,
        });
        if (existingRate) {
            return handleError(res, null, "An exchange rate for this currency pair already exists for this institution", 400);
        }
        // Crear la nueva tasa de cambio
        const newExchangeRate = new InstitutionExchangeRate_1.default({
            currencyFrom,
            currencyTo,
            exchangeRate,
            institution,
        });
        const savedExchangeRate = yield newExchangeRate.save();
        // Registrar en el historial
        yield registerExchangeRateHistory(currencyFrom, currencyTo, exchangeRate, institution);
        handleResponse(res, 201, savedExchangeRate);
    }
    catch (error) {
        handleError(res, error, "Error creating exchange rate", 500);
    }
});
exports.createInstitutionExchangeRate = createInstitutionExchangeRate;
// Obtener todas las tasas de cambio de instituciones
const getAllInstitutionExchangeRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exchangeRates = yield InstitutionExchangeRate_1.default.find().populate("institution");
        handleResponse(res, 200, exchangeRates);
    }
    catch (error) {
        handleError(res, error, "Error fetching exchange rates", 500);
    }
});
exports.getAllInstitutionExchangeRates = getAllInstitutionExchangeRates;
// Obtener una tasa de cambio específica por su ID
const getInstitutionExchangeRateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exchangeRate = yield InstitutionExchangeRate_1.default.findById(id).populate("institution");
        if (!exchangeRate) {
            return handleError(res, null, "Exchange rate not found", 404);
        }
        handleResponse(res, 200, exchangeRate);
    }
    catch (error) {
        handleError(res, error, "Error fetching exchange rate", 500);
    }
});
exports.getInstitutionExchangeRateById = getInstitutionExchangeRateById;
// Actualizar un registro de tasa de cambio de institución
const updateInstitutionExchangeRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { currencyFrom, currencyTo, exchangeRate, institution } = req.body;
        // Verificar que el registro exista
        const existingRate = yield InstitutionExchangeRate_1.default.findById(id);
        if (!existingRate) {
            return handleError(res, null, "Exchange rate not found", 404);
        }
        // Verificar si existe otro registro con la misma combinación de currencyFrom, currencyTo, e institution
        const duplicateRate = yield InstitutionExchangeRate_1.default.findOne({
            currencyFrom,
            currencyTo,
            institution,
            _id: { $ne: id }, // Excluir el registro actual de la búsqueda
        });
        if (duplicateRate) {
            return handleError(res, null, "An exchange rate for this currency pair already exists for this institution", 400);
        }
        // Actualizar los campos
        existingRate.currencyFrom = currencyFrom;
        existingRate.currencyTo = currencyTo;
        existingRate.exchangeRate = exchangeRate;
        existingRate.institution = institution;
        existingRate.update_date = new Date();
        const updatedExchangeRate = yield existingRate.save();
        // Registrar en el historial
        yield registerExchangeRateHistory(currencyFrom, currencyTo, exchangeRate, institution);
        handleResponse(res, 200, updatedExchangeRate);
    }
    catch (error) {
        handleError(res, error, "Error updating exchange rate", 500);
    }
});
exports.updateInstitutionExchangeRate = updateInstitutionExchangeRate;
// Eliminar un registro de tasa de cambio de institución
const deleteInstitutionExchangeRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedExchangeRate = yield InstitutionExchangeRate_1.default.findByIdAndDelete(id);
        if (!deletedExchangeRate) {
            return handleError(res, null, "Exchange rate not found", 404);
        }
        handleResponse(res, 200, { message: "Exchange rate deleted successfully" });
    }
    catch (error) {
        handleError(res, error, "Error deleting exchange rate", 500);
    }
});
exports.deleteInstitutionExchangeRate = deleteInstitutionExchangeRate;
/**
 * @swagger
 * components:
 *   schemas:
 *     InstitutionExchangeRate:
 *       type: object
 *       required:
 *         - currencyFrom
 *         - currencyTo
 *         - exchangeRate
 *         - institution
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado de la tasa de cambio
 *         currencyFrom:
 *           type: string
 *           description: Moneda de origen
 *         currencyTo:
 *           type: string
 *           description: Moneda de destino
 *         exchangeRate:
 *           type: number
 *           description: Valor de la tasa de cambio
 *         institution:
 *           type: string
 *           description: ID de la institución asociada
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 */
//# sourceMappingURL=institutionExchangeRateController.js.map