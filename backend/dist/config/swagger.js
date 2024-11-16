"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
                url: `${process.env.BASE_URL}`,
            },
        ],
    },
    apis: ["**/*.ts"],
};
const swaggerUiOptions = {
    explorer: true,
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, swaggerUiOptions));
    console.log(`📄 Documentación disponible en: ${process.env.BASE_URL}/api-docs`);
};
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map