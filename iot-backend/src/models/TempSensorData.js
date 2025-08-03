const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    temperature : Number,
    humidity : Number,
    powerUsage : Number,
    timestanp : {type:Date, default:Date.now}
});

module.exports= mongoose.model('SensorData',SensorDataSchema);