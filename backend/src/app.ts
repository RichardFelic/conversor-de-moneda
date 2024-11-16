import express, { Application } from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import { corsMiddleware } from "./middleware/corsConfig";
// import cors from 'cors'
import userRoutes from "./routes/userRoutes";
import conversionRoutes from "./routes/conversionRoutes";
import exchangeRateHistoryRoutes from "./routes/exchangeRateHistoryRoutes";
import institutionRoutes from "./routes/institutionRoutes";
import institutionExchangeRateRoutes from "./routes/institutionExchangeRateRoutes";

//swagger
import swaggerDocs from "./config/swagger";

const app: Application = express();

/* Middlewares y rutas */

// json middleware
app.use(express.json());

// cors middleware
app.use(corsMiddleware);

// Routes
app.use("/api/exchange-rates", exchangeRateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversions", conversionRoutes);
app.use("/api/exchange-rate-history", exchangeRateHistoryRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/institutions-exchange-rates", institutionExchangeRateRoutes);

swaggerDocs(app);

export default app;
