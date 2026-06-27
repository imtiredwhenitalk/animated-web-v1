import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Якщо це помилка Zod – повертаємо 400 з деталями
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: 'Помилка валідації даних',
      details: err.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
      })),
      timestamp: new Date().toISOString()
    });
    return;
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Щось пішло не так у космосі 🚀';

  console.error(`❌ Помилка: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};