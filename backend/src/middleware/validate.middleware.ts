import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Схема для planetId – перевіряємо, що це рядок з допустимими символами
export const planetIdSchema = z.object({
  id: z.string()
    .min(1, 'ID не може бути порожнім')
    .regex(/^[a-zA-Z0-9_-]+$/, 'ID може містити тільки літери, цифри, дефіс та підкреслення')
    .max(50, 'ID не може перевищувати 50 символів')
});

// Схема для query-параметрів (пагінація, сортування) – на майбутнє
export const querySchema = z.object({
  limit: z.string().optional().transform(Number).pipe(z.number().min(1).max(100)),
  offset: z.string().optional().transform(Number).pipe(z.number().min(0)),
  sort: z.enum(['asc', 'desc']).optional().default('asc')
}).partial(); // всі поля опціональні

// Універсальний middleware – приймає будь-яку Zod-схему і валідує params, query, body
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Об'єднуємо всі вхідні дані
      const dataToValidate = { ...req.params, ...req.query, ...req.body };
      schema.parse(dataToValidate);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Форматуємо помилки для відповіді
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
          ...(issue.code === 'invalid_type' && { expected: issue.expected })
        }));

        res.status(400).json({
          success: false,
          error: 'Помилка валідації даних',
          details: errors,
          timestamp: new Date().toISOString()
        });
      } else {
        next(error);
      }
    }
  };
};