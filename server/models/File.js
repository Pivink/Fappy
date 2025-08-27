import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["image", "video", "document", "other"], required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("File", fileSchema);