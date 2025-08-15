
import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
}

export function errorHandler(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${statusCode}: ${message}`);
  
  res.status(statusCode).json({
    error: {
        message: message,
        path: req.path,
        timestamp: new Date().toISOString()
    }
  });
}
