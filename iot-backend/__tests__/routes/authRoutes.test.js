const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../../server');
const User = require('../../src/models/User');

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

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth Routes', () => {
  const uniqueEmail = () => `user${Date.now()}@mail.com`;

  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: uniqueEmail(),
      password: 'testpass123',
      role: 'user',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'nouser',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should not register a user with duplicate email', async () => {
    const email = uniqueEmail();
    await request(app).post('/api/auth/register').send({
      username: 'dupuser1',
      email,
      password: 'dup12345',
      role: 'user',
    });
    const res = await request(app).post('/api/auth/register').send({
      username: 'dupuser2',
      email,
      password: 'dup12345',
      role: 'user',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should login a registered user', async () => {
    const email = uniqueEmail();
    const password = 'testpass123';
    await request(app).post('/api/auth/register').send({
      username: 'loginuser',
      email,
      password,
      role: 'user',
    });
    const res = await request(app).post('/api/auth/login').send({
      email,
      password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });

  it('should not login with wrong credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'notfound@mail.com',
      password: 'wrongpass',
    });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should not login with missing fields', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: '',
    });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});