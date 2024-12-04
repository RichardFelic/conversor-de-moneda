import express, { Application } from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import { corsMiddleware } from "./middleware/corsConfig";
import userRoutes from "./routes/userRoutes";
import conversionRoutes from "./routes/conversionRoutes";
import exchangeRateHistoryRoutes from "./routes/exchangeRateHistoryRoutes";
import institutionRoutes from "./routes/institutionRoutes";
import institutionExchangeRateRoutes from "./routes/institutionExchangeRateRoutes";
import swaggerDocs from "./config/swagger";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Ruta base para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Routes
app.use("/api/exchange-rates", exchangeRateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversions", conversionRoutes);
app.use("/api/exchange-rate-history", exchangeRateHistoryRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/institutions-exchange-rates", institutionExchangeRateRoutes);

// Swagger documentation - debe ir después de las rutas
swaggerDocs(app);

export default app;
