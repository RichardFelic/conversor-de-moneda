// src/controllers/institutionController.ts
import { Request, Response } from "express";
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

// Crear una nueva institución
export const createInstitution = async (req: Request, res: Response) => {
  const { name, country, img } = req.body;

  // Verificar si la institución ya existe
  const institutionExists = await Institution.findOne({ name, country, img });
  if (institutionExists) {
    handleError(
      res,
      new Error("La institución ya existe"),
      "La institución ya existe",
      409 // Código de estado de conflicto
    );
    return;
  }

  try {
    const newInstitution = new Institution({
      name,
      country,
      img,
    });
    const savedInstitution = await newInstitution.save();
    handleResponse(res, 201, savedInstitution);
  } catch (error) {
    handleError(res, error, "Error al crear la institución", 500);
  }
};

// Obtener todas las instituciones
export const getAllInstitutions = async (req: Request, res: Response) => {
  try {
    const institutions = await Institution.find();

    if (!institutions || institutions.length === 0) {
      handleError(
        res,
        new Error("No se encontraron instituciones"),
        "No se encontraron instituciones",
        404
      );
      return;
    }

    handleResponse(res, 200, institutions);
  } catch (error) {
    handleError(res, error, "Error al obtener las instituciones", 500);
  }
};

// Obtener una institución por ID
export const getInstitutionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) {
      handleError(
        res,
        new Error("Institución no encontrada"),
        "Institución no encontrada",
        404
      );
      return;
    }
    handleResponse(res, 200, institution);
  } catch (error) {
    handleError(res, error, "Error al obtener la institución", 500);
  }
};

// Actualizar una institución
export const updateInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, country, img } = req.body;
  try {
    const updatedInstitution = await Institution.findByIdAndUpdate(
      req.params.id,
      { name, country, img },
      { new: true }
    );
    if (!updatedInstitution) {
      handleError(
        res,
        new Error("Institución no encontrada"),
        "Institución no encontrada",
        404
      );
      return;
    }
    handleResponse(res, 200, updatedInstitution);
  } catch (error) {
    handleError(res, error, "Error al actualizar la institución", 500);
  }
};

// Eliminar una institución
export const deleteInstitution = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedInstitution = await Institution.findByIdAndDelete(
      req.params.id
    );
    if (!deletedInstitution) {
      handleError(
        res,
        new Error("Institución no encontrada"),
        "Institución no encontrada",
        404
      );
      return;
    }
    res.status(204).send();
  } catch (error) {
    handleError(res, error, "Error al eliminar la institución", 500);
  }
};

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
