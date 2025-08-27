import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 fix here

  subFolders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
}, { timestamps: true });


export default mongoose.model("Folder", folderSchema);