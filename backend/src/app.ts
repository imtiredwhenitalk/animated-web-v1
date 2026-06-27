import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import planetRoutes from "./routes/planet.routes";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173"];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/planets", planetRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;