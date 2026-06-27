import { Request, Response } from 'express';
import { PlanetService } from '../services/planet.service';

const planetService = new PlanetService();

export class PlanetController {
  // GET /api/planets
  getPlanets(req: Request, res: Response): void {
    try {
      // req.query вже провалідовано, але може бути undefined
      const { limit, offset, sort } = req.query as any;
      const planets = planetService.getAllPlanets();

      // Проста пагінація та сортування
      let result = planets;
      if (sort === 'desc') result = [...result].reverse();
      if (offset) result = result.slice(Number(offset) || 0);
      if (limit) result = result.slice(0, Number(limit) || result.length);

      res.json({
        success: true,
        data: result,
        pagination: {
          total: planets.length,
          limit: Number(limit) || planets.length,
          offset: Number(offset) || 0
        }
      });
    } catch (error) {
      console.error('Помилка в getPlanets:', error);
      res.status(500).json({
        success: false,
        error: 'Внутрішня помилка сервера'
      });
    }
  }

  // GET /api/planets/:id
  getPlanetById(req: Request, res: Response): void {
    try {
      const { id } = req.params;

      // Перевіряємо, чи id є рядком (може бути string[], undefined)
      if (typeof id !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Невірний ідентифікатор планети'
        });
        return;
      }

      const planet = planetService.getPlanetById(id);

      if (!planet) {
        res.status(404).json({
          success: false,
          error: `Планету "${id}" не знайдено в нашій галактиці 🌌`
        });
        return;
      }

      res.json({
        success: true,
        data: planet
      });
    } catch (error) {
      console.error('Помилка в getPlanetById:', error);
      res.status(500).json({
        success: false,
        error: 'Внутрішня помилка сервера'
      });
    }
  }
}