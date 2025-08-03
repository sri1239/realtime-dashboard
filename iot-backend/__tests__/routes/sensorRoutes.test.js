const request = require('supertest');
const app = require('../../server');

describe('Sensor Routes', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).get('/api/sensor');
    expect(res.statusCode).toBe(401);
  });
});
