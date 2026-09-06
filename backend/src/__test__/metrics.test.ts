import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

const analyticsMock = vi.hoisted(() => ({
  clearAlerts: vi.fn(),
  getMetrics: vi.fn(),
  logRequest: vi.fn()
}));

vi.mock('../services/analytics.service', () => ({
  analytics: analyticsMock
}));

import app from '../app';

const baseMetrics = () => ({
  totalRequests: 12,
  errors: 2,
  errorRate: 16.6666,
  avgResponseTime: 23.456,
  topPlanets: { earth: 4 },
  suspiciousIPs: new Set(['127.0.0.2']),
  alerts: ['test alert'],
  recentRequests: Array.from({ length: 12 }, (_, index) => ({
    timestamp: `2026-09-05T00:00:${String(index).padStart(2, '0')}.000Z`,
    method: 'GET',
    url: `/api/planets/${index}`,
    statusCode: index === 11 ? 404 : 200,
    duration: index + 1,
    ip: '127.0.0.1',
    userAgent: 'vitest',
    planetId: index === 11 ? undefined : 'earth'
  }))
});

describe('metrics controller endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    analyticsMock.getMetrics.mockReturnValue(baseMetrics());
  });

  it('returns formatted metrics and only the ten most recent requests', async () => {
    const response = await request(app).get('/api/planets/metrics');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        totalRequests: 12,
        errors: 2,
        errorRate: '16.67%',
        avgResponseTime: '23.46ms',
        topPlanets: { earth: 4 },
        suspiciousIPs: ['127.0.0.2'],
        alerts: ['test alert']
      })
    });
    expect(response.body.data.recentRequests).toHaveLength(10);
    expect(response.body.data.recentRequests[0]).toMatchObject({
      timestamp: '2026-09-05T00:00:02.000Z',
      status: 200,
      duration: '3ms',
      planet: 'earth'
    });
    expect(response.body.data.recentRequests.at(-1)).toMatchObject({
      status: 404,
      duration: '12ms',
      planet: '-'
    });
  });

  it('does not expose the analytics Set or mutate the service result', async () => {
    const metrics = baseMetrics();
    analyticsMock.getMetrics.mockReturnValue(metrics);

    const response = await request(app).get('/api/planets/metrics');

    response.body.data.suspiciousIPs.push('attacker');
    expect(metrics.suspiciousIPs).toEqual(new Set(['127.0.0.2']));
  });

  it('clears alerts and returns a successful response', async () => {
    const response = await request(app).delete('/api/planets/metrics/alerts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, message: 'Алерти очищено' });
    expect(analyticsMock.clearAlerts).toHaveBeenCalledOnce();
  });
});