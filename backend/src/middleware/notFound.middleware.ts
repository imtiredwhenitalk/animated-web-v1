import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    error: `🌌 Маршрут "${req.originalUrl}" не знайдено в нашій галактиці`
  });
};