import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { sendConfirmationEmail } from "../utils/mailer"; // Importar el servicio de correo
import { Roles } from "../constants/roles";

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

// Hash password function
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Validate password function
const validatePassword = async (
  inputPassword: string,
  storedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email, name, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      name,
      role: role || Roles.USER,
    });
    await user.save();

    // Enviar el correo de confirmación
    await sendConfirmationEmail(user.email, user._id.toString());

    handleResponse(res, 201, {
      message:
        "Usuario registrado exitosamente. Por favor, confirma tu correo.",
    });
  } catch (error) {
    handleError(res, error, "Error al registrar el usuario", 500);
  }
};

// Confirm email
export const confirmEmail = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      handleError(
        res,
        new Error("Usuario no encontrado"),
        "Usuario no encontrado",
        404
      );
      return;
    }

    if (user.isConfirmed) {
      handleResponse(res, 200, { message: "El correo ya ha sido confirmado." });
      return;
    }

    user.isConfirmed = true;
    await user.save();
    handleResponse(res, 200, { message: "Correo confirmado exitosamente." });
  } catch (error) {
    handleError(res, error, "Error al confirmar el correo", 500);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      handleError(
        res,
        new Error("Usuario no encontrado"),
        "Usuario no encontrado",
        404
      );
      return;
    }

    if (!user.isConfirmed) {
      handleError(
        res,
        new Error("Correo no confirmado"),
        "Correo no confirmado",
        403
      );
      return;
    }

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      handleError(
        res,
        new Error("Contraseña incorrecta"),
        "Contraseña incorrecta",
        403
      );
      return;
    }

    const token = generateToken(user._id.toString());
    handleResponse(res, 200, {
      message: "Inicio de sesión exitoso",
      token,
      role: user.role,
    });
  } catch (error) {
    handleError(res, error, "Error al iniciar sesión, intente mas tarde", 500);
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users) {
      handleError(
        res,
        new Error("No se encontraron usuarios"),
        "No se encontraron usuarios",
        404
      );
      return;
    }

    handleResponse(res, 200, users);
  } catch (error) {
    handleError(res, error, "Error al obtener los usuarios", 500);
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      handleError(
        res,
        new Error("Usuario no encontrado"),
        "Usuario no encontrado",
        404
      );
      return;
    }
    handleResponse(res, 200, user);
  } catch (error) {
    handleError(res, error, "Error al obtener el usuario", 500);
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  const { password, ...rest } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, rest, {
      new: true,
    });
    if (!updatedUser) {
      handleError(
        res,
        new Error("Usuario no encontrado"),
        "Usuario no encontrado",
        404
      );
      return;
    }
    handleResponse(res, 200, updatedUser);
  } catch (error) {
    handleError(res, error, "Error al actualizar el usuario", 500);
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      handleError(
        res,
        new Error("Usuario no encontrado"),
        "Usuario no encontrado",
        404
      );
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    handleError(
      res,
      error,
      "Error al eliminar el usuario, intente de nuevo mas tarde",
      500
    );
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:

 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *           description: Rol del usuario
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */
