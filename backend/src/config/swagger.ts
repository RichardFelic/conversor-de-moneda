import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

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
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["**/*.ts"],
};

const swaggerUiOptions = {
  explorer: true,
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );
  console.log("📄 Documentación disponible en: http://localhost:3000/api-docs");
};

export default swaggerDocs;
