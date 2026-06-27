// src/controllers/metrics.controller.ts

import { Request, Response } from 'express';
import { analytics } from '../services/analytics.service';

export class MetricsController {
  getMetrics(req: Request, res: Response): void {
    const metrics = analytics.getMetrics();
    res.json({
      success: true,
      data: {
        totalRequests: metrics.totalRequests,
        errors: metrics.errors,
        errorRate: `${metrics.errorRate.toFixed(2)}%`,
        avgResponseTime: `${metrics.avgResponseTime.toFixed(2)}ms`,
        topPlanets: metrics.topPlanets,
        suspiciousIPs: [...metrics.suspiciousIPs],
        alerts: metrics.alerts,
        recentRequests: metrics.recentRequests.slice(-10).map(r => ({
          timestamp: r.timestamp,
          method: r.method,
          url: r.url,
          status: r.statusCode,
          duration: `${r.duration}ms`,
          planet: r.planetId || '-'
        }))
      }
    });
  }

  // DELETE /api/metrics/alerts
  clearAlerts(req: Request, res: Response): void {
    analytics.clearAlerts();
    res.json({ success: true, message: 'Алерти очищено' });
  }
}