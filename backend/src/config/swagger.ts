import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Conversión de Monedas",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: process.env.BASE_URL ,
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.[tj]s'),
    path.join(__dirname, '../controllers/*.[tj]s')
  ],
};

const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
  },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application) => {
  // Ruta base para verificar que el servidor está funcionando
  app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
  });

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );
  console.log(`📄 Documentación disponible en: '${process.env.BASE_URL}/api-docs'`);
};

export default swaggerDocs;
