const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
jest.setTimeout(20000);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Controller', () => {
  afterAll(() => mongoose.disconnect());

  it('should register a user', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testUser',
      email: `test${Date.now()}@example.com`, // unique email
      password: 'testpass123',
      role: 'user'
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.message).toBe('User registered successfully');
});

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpass'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid email or password');
  });
});