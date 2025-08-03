const mongoose = require('mongoose');
const User = require('../../src/models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/iot-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('User Model', () => {
  it('should hash password on save', async () => {
    const user = new User({ username: 'user', email: 'user@mail.com', password: 'pass123', role: 'user' });
    await user.save();
    expect(user.password).not.toBe('pass123');
  });

  it('should compare passwords correctly', async () => {
    const user = new User({ username: 'user2', email: 'user2@mail.com', password: 'pass456', role: 'user' });
    await user.save();
    const isMatch = await user.comparePassword('pass456');
    expect(isMatch).toBe(true);
  });
});