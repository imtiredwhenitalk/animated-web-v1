import { Router } from 'express';
import { PlanetController } from '../controllers/planet.controller';
import { MetricsController } from '../controllers/metrics.controller';
import { validate, planetIdSchema, querySchema } from '../middleware/validate.middleware';

const router = Router();
const planetController = new PlanetController();
const metricsController = new MetricsController();

// Отримати всі планети – з валідацією query
router.get(
  '/',
  validate(querySchema),
  (req, res) => planetController.getPlanets(req, res)
);

// Отримати планету за ID – з валідацією params
router.get(
  '/:id',
  validate(planetIdSchema),
  (req, res) => planetController.getPlanetById(req, res)
);

// Метрики (без валідації, але можна додати за бажанням)
router.get('/metrics', (req, res) => metricsController.getMetrics(req, res));
router.delete('/metrics/alerts', (req, res) => metricsController.clearAlerts(req, res));

export default router;