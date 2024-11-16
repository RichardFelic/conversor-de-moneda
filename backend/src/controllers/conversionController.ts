import { Request, Response } from "express";
import Conversion from "../models/Conversion";
import ExchangeRate from "../models/ExchangeRate";
import InstitutionExchangeRate from "../models/InstitutionExchangeRate";

/**
 * Realiza una conversión de moneda.
 * @param req
 * @param res
 */

export const logConversion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { currencyFrom, currencyTo, amount, institution_exchange_rate_id } =
    req.body;

  // Convertir las monedas a mayúsculas
  const newCurrencyFrom = currencyFrom.toUpperCase();
  const newCurrencyTo = currencyTo.toUpperCase();

  try {
    let exchangeRate;
    let result: number;

    // Verificar si se proporciona un `institution_exchange_rate_id`
    if (institution_exchange_rate_id) {
      // Buscar en la colección InstitutionExchangeRate
      exchangeRate = await InstitutionExchangeRate.findById(
        institution_exchange_rate_id
      )
        .where("currencyFrom")
        .equals(newCurrencyFrom)
        .where("currencyTo")
        .equals(newCurrencyTo);

      // Si no se encuentra la tasa de cambio de institución, retornar error
      if (!exchangeRate) {
        console.log(
          `No se encontró la tasa de cambio de institución con ID: ${institution_exchange_rate_id}`
        );
        res
          .status(404)
          .json({ message: "Tasa de cambio de institución no encontrada" });
        return; // Retornar aquí para evitar continuar la ejecución
      } else {
        console.log(
          `Tasa de cambio de institución encontrada: ${exchangeRate.exchangeRate}`
        );
      }
    } else {
      // Si no se proporciona `institution_exchange_rate_id`, buscar en ExchangeRate
      exchangeRate = await ExchangeRate.findOne({
        currencyFrom: newCurrencyFrom,
        currencyTo: newCurrencyTo,
      });

      // Si no se encuentra la tasa de cambio estándar, retornar error
      if (!exchangeRate) {
        console.log(
          `No se encontró la tasa de cambio estándar para ${newCurrencyFrom} a ${newCurrencyTo}`
        );
        res
          .status(404)
          .json({ message: "Tasa de cambio estándar no encontrada" });
        return; // Retornar aquí para evitar continuar la ejecución
      } else {
        console.log(
          `Tasa de cambio estándar encontrada: ${exchangeRate.exchangeRate}`
        );
      }
    }

    // Realizar la conversión con la tasa de cambio encontrada
    result = amount * exchangeRate.exchangeRate;

    // Crear una nueva conversión
    const conversion = new Conversion({
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
    const savedConversion = await conversion.save();
    res.status(200).json(savedConversion);
    return; // Retornar aquí también para indicar que hemos terminado
  } catch (error) {
    console.error("Error en la conversión:", error);
    res.status(500).json({ message: "Error al realizar la conversión", error });
    return; // Retornar aquí para evitar seguir ejecutando después del error
  }
};

/**
 * Obtiene el historial de conversiones (solo para ADMIN).
 * @param req
 * @param res
 */

// Controlador para obtener el historial de conversiones (solo para ADMIN)
export const getConversionHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtener todas las conversiones ordenadas por fecha de creación en orden descendente
    const conversions = await Conversion.find().sort({ createdAt: -1 });

    if (!conversions || conversions.length === 0) {
      res
        .status(404)
        .json({ message: "No se encontró historial de conversiones" });
      return;
    }

    // Responder con el historial de conversiones
    res.status(200).json(conversions);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el historial de conversiones",
      error,
    });
  }
};

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
