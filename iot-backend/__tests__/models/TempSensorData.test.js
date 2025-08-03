const SensorData = require('../../src/models/TempSensorData');

describe('SensorData Model', () => {
  it('should create a SensorData instance', () => {
    const data = new SensorData({ temperature: 25, humidity: 50, powerUsage: 150 });
    expect(data).toHaveProperty('temperature', 25);
    expect(data).toHaveProperty('humidity', 50);
    expect(data).toHaveProperty('powerUsage', 150);
  });
});
