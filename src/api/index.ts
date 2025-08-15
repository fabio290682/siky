
import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "./routes/api.routes";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(errorHandler);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    path: req.originalUrl
  });
});

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor da API rodando na porta ${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
