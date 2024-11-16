"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exchangeRateRoutes_1 = __importDefault(require("./routes/exchangeRateRoutes"));
const corsConfig_1 = require("./middleware/corsConfig");
// import cors from 'cors'
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const conversionRoutes_1 = __importDefault(require("./routes/conversionRoutes"));
const exchangeRateHistoryRoutes_1 = __importDefault(require("./routes/exchangeRateHistoryRoutes"));
const institutionRoutes_1 = __importDefault(require("./routes/institutionRoutes"));
const institutionExchangeRateRoutes_1 = __importDefault(require("./routes/institutionExchangeRateRoutes"));
//swagger
const swagger_1 = __importDefault(require("./config/swagger"));
const app = (0, express_1.default)();
/* Middlewares y rutas */
// json middleware
app.use(express_1.default.json());
// cors middleware
app.use(corsConfig_1.corsMiddleware);
// Routes
app.use("/api/exchange-rates", exchangeRateRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/conversions", conversionRoutes_1.default);
app.use("/api/exchange-rate-history", exchangeRateHistoryRoutes_1.default);
app.use("/api/institutions", institutionRoutes_1.default);
app.use("/api/institutions-exchange-rates", institutionExchangeRateRoutes_1.default);
(0, swagger_1.default)(app);
exports.default = app;
//# sourceMappingURL=app.js.map