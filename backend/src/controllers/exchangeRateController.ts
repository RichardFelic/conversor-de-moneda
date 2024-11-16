import { Request, Response } from "express";
import ExchangeRate from "../models/ExchangeRate";
import ExchangeRateHistory from "../models/ExchangeRateHistory";

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
  exchangeRate: number
) => {
  try {
    const historyEntry = new ExchangeRateHistory({
      currencyFrom,
      currencyTo,
      exchangeRate,
      date: new Date(),
    });
    await historyEntry.save();
  } catch (error) {
    console.error("Error registering exchange rate history:", error);
  }
};

// Crear un nuevo registro de tasa de cambio
export const createExchangeRate = async (req: Request, res: Response) => {
  try {
    const { currencyFrom, currencyTo, exchangeRate } = req.body;

    // Verificar si ya existe un registro con la misma combinación de currencyFrom y currencyTo
    const existingRate = await ExchangeRate.findOne({
      currencyFrom,
      currencyTo,
    });
    if (existingRate) {
      return handleError(
        res,
        null,
        "An exchange rate for this currency pair already exists",
        400
      );
    }

    // Crear la nueva tasa de cambio
    const newExchangeRate = new ExchangeRate({
      currencyFrom,
      currencyTo,
      exchangeRate,
    });

    const savedExchangeRate = await newExchangeRate.save();

    // Registrar en el historial
    await registerExchangeRateHistory(currencyFrom, currencyTo, exchangeRate);

    handleResponse(res, 201, savedExchangeRate);
  } catch (error: unknown) {
    // Verificar si el error es de tipo 'Error' y tiene el código 11000 (duplicado de clave)
    if (error instanceof Error && (error as any).code === 11000) {
      return handleError(
        res,
        error,
        "An exchange rate for this currency pair already exists",
        400
      );
    }
    // Si no es un error de tipo MongoDB, manejar el error general
    handleError(res, error, "Error creating exchange rate", 500);
  }
};

// Obtener todas las tasas de cambio
export const getAllExchangeRates = async (req: Request, res: Response) => {
  try {
    const exchangeRates = await ExchangeRate.find();
    handleResponse(res, 200, exchangeRates);
  } catch (error) {
    handleError(res, error, "Error fetching exchange rates", 500);
  }
};

// Obtener una tasa de cambio específica por su ID
export const getExchangeRateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exchangeRate = await ExchangeRate.findById(id);
    if (!exchangeRate) {
      return handleError(res, null, "Exchange rate not found", 404);
    }
    handleResponse(res, 200, exchangeRate);
  } catch (error) {
    handleError(res, error, "Error fetching exchange rate", 500);
  }
};

// Actualizar un registro de tasa de cambio
export const updateExchangeRate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currencyFrom, currencyTo, exchangeRate } = req.body;

    // Verificar que el registro exista
    const existingRate = await ExchangeRate.findById(id);
    if (!existingRate) {
      return handleError(res, null, "Exchange rate not found", 404);
    }

    // Verificar si existe otro registro con la misma combinación de currencyFrom y currencyTo
    const duplicateRate = await ExchangeRate.findOne({
      currencyFrom,
      currencyTo,
      _id: { $ne: id }, // Excluir el registro actual de la búsqueda
    });

    if (duplicateRate) {
      return handleError(
        res,
        null,
        "An exchange rate for this currency pair already exists",
        400
      );
    }

    // Actualizar los campos
    existingRate.currencyFrom = currencyFrom;
    existingRate.currencyTo = currencyTo;
    existingRate.exchangeRate = exchangeRate;
    existingRate.update_date = new Date();

    const updatedExchangeRate = await existingRate.save();

    // Registrar en el historial
    await registerExchangeRateHistory(currencyFrom, currencyTo, exchangeRate);

    handleResponse(res, 200, updatedExchangeRate);
  } catch (error) {
    handleError(res, error, "Error updating exchange rate", 500);
  }
};

// Eliminar un registro de tasa de cambio
export const deleteExchangeRate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedExchangeRate = await ExchangeRate.findByIdAndDelete(id);
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
