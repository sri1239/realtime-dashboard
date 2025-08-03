const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Sensor = require('../../src/models/TempSensorData'); // Adjust path if needed

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

beforeEach(async () => {
  await Sensor.create({
    temperature: 25,
    humidity: 60,
    powerUsage: 100,
    timestamp: new Date()
  });
});

afterEach(async () => {
  await Sensor.deleteMany({});
});
describe('GraphQL API', () => {
  it('should return sensor data', async () => {
    const query = {
      query: `{
        sensorData {
          temperature
          humidity
          powerUsage
          timestamp
        }
      }`
    };

    const res = await request(app)
      .post('/graphql')
      .send(query);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.sensorData).toBeInstanceOf(Array);
  });
});
