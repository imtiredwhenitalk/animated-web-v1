import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js'; 

const mockPlanets = vi.hoisted(() => [
  { id: 'earth', name: 'Earth', type: 'terrestrial' },
  { id: 'jupiter', name: 'Jupiter', type: 'gas_giant' },
]);

vi.mock('../services/planet.service.js', () => ({
  PlanetService: vi.fn(function (this: any) {
    this.getAllPlanets = vi.fn().mockReturnValue(mockPlanets);
    this.getPlanetById = vi.fn((id: string) =>
      mockPlanets.find((p) => p.id === id) || null
    );
  }),
}));

vi.mock('../services/analytics.service.js', () => ({
  analytics: {
    logRequest: vi.fn(),
    getStats: vi.fn().mockReturnValue({}),
  },
}));

describe('GET /api/planets', () => {
  it('повертає список планет зі статусом 200', async () => {
    const res = await request(app).get('/api/planets');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
  });

  it('підтримує limit', async () => {
    const res = await request(app).get('/api/planets?limit=1');
    expect(res.body.data).toHaveLength(1);
  });
});

describe('GET /api/planets/:id', () => {
  it('повертає планету за ID (earth)', async () => {
    const res = await request(app).get('/api/planets/earth');
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ id: 'earth', name: 'Earth' });
  });

  it('повертає 404 для неіснуючої планети', async () => {
    const res = await request(app).get('/api/planets/mars');
    expect(res.status).toBe(404);
  });
});