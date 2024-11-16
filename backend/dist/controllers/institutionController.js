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
exports.deleteInstitution = exports.updateInstitution = exports.getInstitutionById = exports.getAllInstitutions = exports.createInstitution = void 0;
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
// Crear una nueva institución
const createInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, country, img } = req.body;
    // Verificar si la institución ya existe
    const institutionExists = yield Institution_1.default.findOne({ name, country, img });
    if (institutionExists) {
        handleError(res, new Error("La institución ya existe"), "La institución ya existe", 409 // Código de estado de conflicto
        );
        return;
    }
    try {
        const newInstitution = new Institution_1.default({
            name,
            country,
            img,
        });
        const savedInstitution = yield newInstitution.save();
        handleResponse(res, 201, savedInstitution);
    }
    catch (error) {
        handleError(res, error, "Error al crear la institución", 500);
    }
});
exports.createInstitution = createInstitution;
// Obtener todas las instituciones
const getAllInstitutions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const institutions = yield Institution_1.default.find();
        if (!institutions || institutions.length === 0) {
            handleError(res, new Error("No se encontraron instituciones"), "No se encontraron instituciones", 404);
            return;
        }
        handleResponse(res, 200, institutions);
    }
    catch (error) {
        handleError(res, error, "Error al obtener las instituciones", 500);
    }
});
exports.getAllInstitutions = getAllInstitutions;
// Obtener una institución por ID
const getInstitutionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const institution = yield Institution_1.default.findById(req.params.id);
        if (!institution) {
            handleError(res, new Error("Institución no encontrada"), "Institución no encontrada", 404);
            return;
        }
        handleResponse(res, 200, institution);
    }
    catch (error) {
        handleError(res, error, "Error al obtener la institución", 500);
    }
});
exports.getInstitutionById = getInstitutionById;
// Actualizar una institución
const updateInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, country, img } = req.body;
    try {
        const updatedInstitution = yield Institution_1.default.findByIdAndUpdate(req.params.id, { name, country, img }, { new: true });
        if (!updatedInstitution) {
            handleError(res, new Error("Institución no encontrada"), "Institución no encontrada", 404);
            return;
        }
        handleResponse(res, 200, updatedInstitution);
    }
    catch (error) {
        handleError(res, error, "Error al actualizar la institución", 500);
    }
});
exports.updateInstitution = updateInstitution;
// Eliminar una institución
const deleteInstitution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedInstitution = yield Institution_1.default.findByIdAndDelete(req.params.id);
        if (!deletedInstitution) {
            handleError(res, new Error("Institución no encontrada"), "Institución no encontrada", 404);
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        handleError(res, error, "Error al eliminar la institución", 500);
    }
});
exports.deleteInstitution = deleteInstitution;
/**
 * @swagger
 * components:
 *   schemas:
 *     Institution:
 *       type: object
 *       required:
 *         - name
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado de la institución
 *         name:
 *           type: string
 *           description: Nombre de la institución
 *         country:
 *           type: string
 *           description: País de la institución
 *       example:
 *         id: 648f00dffed9c2b497cfd846
 *         name: Universidad Nacional
 *         country: República Dominicana
 */
//# sourceMappingURL=institutionController.js.map