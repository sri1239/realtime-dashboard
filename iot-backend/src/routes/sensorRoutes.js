const express = require("express");
const router = express.Router();
const SensorData = require("../models/TempSensorData");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { temperature, humidity, powerUsage } = req.body;
    const data = new SensorData({ temperature, humidity, powerUsage });
    await data.save();

    const io = req.app.get("io");
    io.emit("sensorData", data);

    res.status(201).json({ message: "Sensor Data stored", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to save sensor data" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(50);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
});

module.exports = router;
