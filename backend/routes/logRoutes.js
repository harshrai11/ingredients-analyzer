import express from "express";
import Log from "../models/Log.js";

const router = express.Router();


// Save new log
router.post("/add", async (req, res) => {
  try {
    const newLog = new Log(req.body);
    const savedLog = await newLog.save();
    res.json(savedLog);
  } catch (error) {
    res.status(500).json(error);
  }
});


// Get all logs
router.get("/all", async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;