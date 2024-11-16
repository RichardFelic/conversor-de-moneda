import { Request, Response } from "express";
import InstitutionExchangeRate from "../models/InstitutionExchangeRate";
import ExchangeRateHistory from "../models/ExchangeRateHistory";
import Institution from "../models/Institution";

// Helper function to handle responses
const handleResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data);
};

// Helper function to handle errors
const handleError = (
  res: Response,
  error: any,
  message: string,
  statusCode: number
) => {
  console.error(message, error);
  res.status(statusCode).json({ error: message });
};

// Registrar un cambio en el historial de tasas de cambio
const registerExchangeRateHistory = async (
  currencyFrom: string,
  currencyTo: string,
  exchangeRate: number,
  institution: string
) => {
  try {
    const historyEntry = new ExchangeRateHistory({
      currencyFrom,
      currencyTo,
      exchangeRate,
      institution,
      date: new Date(),
    });
    await historyEntry.save();
  } catch (error) {
    console.error("Error registering exchange rate history:", error);
  }
};

// Crear un nuevo registro de tasa de cambio de institución
export const createInstitutionExchangeRate = async (
  req: Request,
  res: Response
) => {
  try {
    const { currencyFrom, currencyTo, exchangeRate, institution } = req.body;

    // Verificar que la institución exista
    const institutionExists = await Institution.findById(institution);
    if (!institutionExists) {
      return handleError(res, null, "Institution not found", 404);
    }

    // Verificar si ya existe un registro con la misma combinación de currencyFrom, currencyTo e institution
    const existingRate = await InstitutionExchangeRate.findOne({
      currencyFrom,
      currencyTo,
      institution,
    });
    if (existingRate) {
      return handleError(
        res,
        null,
        "An exchange rate for this currency pair already exists for this institution",
        400
      );
    }

    // Crear la nueva tasa de cambio
    const newExchangeRate = new InstitutionExchangeRate({
      currencyFrom,
      currencyTo,
      exchangeRate,
      institution,
    });

    const savedExchangeRate = await newExchangeRate.save();

    // Registrar en el historial
    await registerExchangeRateHistory(
      currencyFrom,
      currencyTo,
      exchangeRate,
      institution
    );

    handleResponse(res, 201, savedExchangeRate);
  } catch (error) {
    handleError(res, error, "Error creating exchange rate", 500);
  }
};

// Obtener todas las tasas de cambio de instituciones
export const getAllInstitutionExchangeRates = async (
  req: Request,
  res: Response
) => {
  try {
    const exchangeRates = await InstitutionExchangeRate.find().populate(
      "institution"
    );
    handleResponse(res, 200, exchangeRates);
  } catch (error) {
    handleError(res, error, "Error fetching exchange rates", 500);
  }
};

// Obtener una tasa de cambio específica por su ID
export const getInstitutionExchangeRateById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const exchangeRate = await InstitutionExchangeRate.findById(id).populate(
      "institution"
    );
    if (!exchangeRate) {
      return handleError(res, null, "Exchange rate not found", 404);
    }
    handleResponse(res, 200, exchangeRate);
  } catch (error) {
    handleError(res, error, "Error fetching exchange rate", 500);
  }
};

// Actualizar un registro de tasa de cambio de institución
export const updateInstitutionExchangeRate = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { currencyFrom, currencyTo, exchangeRate, institution } = req.body;

    // Verificar que el registro exista
    const existingRate = await InstitutionExchangeRate.findById(id);
    if (!existingRate) {
      return handleError(res, null, "Exchange rate not found", 404);
    }

    // Verificar si existe otro registro con la misma combinación de currencyFrom, currencyTo, e institution
    const duplicateRate = await InstitutionExchangeRate.findOne({
      currencyFrom,
      currencyTo,
      institution,
      _id: { $ne: id }, // Excluir el registro actual de la búsqueda
    });

    if (duplicateRate) {
      return handleError(
        res,
        null,
        "An exchange rate for this currency pair already exists for this institution",
        400
      );
    }

    // Actualizar los campos
    existingRate.currencyFrom = currencyFrom;
    existingRate.currencyTo = currencyTo;
    existingRate.exchangeRate = exchangeRate;
    existingRate.institution = institution;
    existingRate.update_date = new Date();

    const updatedExchangeRate = await existingRate.save();

    // Registrar en el historial
    await registerExchangeRateHistory(
      currencyFrom,
      currencyTo,
      exchangeRate,
      institution
    );

    handleResponse(res, 200, updatedExchangeRate);
  } catch (error) {
    handleError(res, error, "Error updating exchange rate", 500);
  }
};

// Eliminar un registro de tasa de cambio de institución
export const deleteInstitutionExchangeRate = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletedExchangeRate = await InstitutionExchangeRate.findByIdAndDelete(
      id
    );
    if (!deletedExchangeRate) {
      return handleError(res, null, "Exchange rate not found", 404);
    }
    handleResponse(res, 200, { message: "Exchange rate deleted successfully" });
  } catch (error) {
    handleError(res, error, "Error deleting exchange rate", 500);
  }
};

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
