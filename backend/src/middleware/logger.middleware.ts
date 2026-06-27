// src/middleware/logger.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { analytics } from '../services/analytics.service';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;
  const userAgent = req.get('user-agent') || 'unknown';

  // Дістаємо planetId з URL, якщо є
  const planetMatch = originalUrl.match(/\/api\/planets\/([^\/]+)/);
  const planetId = planetMatch ? planetMatch[1] : undefined;

  // Зберігаємо оригінальний метод res.json
  const originalJson = res.json.bind(res);

  // Перевизначаємо, щоб перехопити статус
  let statusCode: number = 200;

  res.json = function(data: any) {
    statusCode = res.statusCode;
    return originalJson(data);
  };

  // Логуємо, коли відповідь пішла
  res.on('finish', () => {
    const duration = Date.now() - start;
    statusCode = res.statusCode;

    // Кольорове логування
    let color = '\x1b[32m'; // зелений (OK)
    let statusColor = '\x1b[32m';
    if (statusCode >= 500) { color = '\x1b[31m'; statusColor = '\x1b[31m'; } // червоний
    else if (statusCode >= 400) { color = '\x1b[33m'; statusColor = '\x1b[33m'; } // жовтий
    else if (statusCode >= 300) { color = '\x1b[36m'; } // блакитний (редиректи)

    // Формуємо лог
    const logEntry = {
      timestamp: new Date().toISOString(),
      method,
      url: originalUrl,
      status: statusCode,
      duration: `${duration}ms`,
      ip,
      userAgent,
      planetId
    };

    // Виводимо в консоль кольорово
    console.log(
      `${color}[${logEntry.timestamp}]\x1b[0m ${method} ${originalUrl} ${statusColor}${statusCode}\x1b[0m - ${duration}ms ${planetId ? `🌍 ${planetId}` : ''}`
    );

    // Відправляємо в аналітику (planetId додається тільки якщо не undefined)
    analytics.logRequest({
      timestamp: logEntry.timestamp,
      method,
      url: originalUrl,
      statusCode,
      duration,
      ip: ip || 'unknown',
      userAgent,
      ...(planetId !== undefined && { planetId })
    });
  });

  next();
};