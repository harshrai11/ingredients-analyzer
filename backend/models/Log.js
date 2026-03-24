import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  date: String,
  weight: Number,
  bodyFat: Number,
  waist: Number,
  notes: String
});

export default mongoose.model("Log", logSchema);