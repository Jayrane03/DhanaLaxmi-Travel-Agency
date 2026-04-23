import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);