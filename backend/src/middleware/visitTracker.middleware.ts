import { Request, Response, NextFunction } from 'express';

// Простий лічильник у пам'яті (можна замінити на базу даних)
const visitStats: Record<string, number> = {};

export const visitTracker = (req: Request, res: Response, next: NextFunction): void => {
  // Перевіряємо, чи це GET-запит до планети
  if (req.method === 'GET' && req.originalUrl.startsWith('/api/planets/')) {
    const planetId = req.params.id;

    // Переконуємось, що planetId – рядок (може бути string[], undefined)
    if (planetId && typeof planetId === 'string') {
      // Оновлюємо статистику
      visitStats[planetId] = (visitStats[planetId] || 0) + 1;

      console.log(
        `👀 [${new Date().toISOString()}] Відвідування планети: \x1b[36m${planetId}\x1b[0m (всього: ${visitStats[planetId]})`
      );
    }
  }

  next();
};

// Функція, щоб отримати статистику (наприклад, для адмінки)
export const getVisitStats = (): Record<string, number> => {
  return { ...visitStats };
};