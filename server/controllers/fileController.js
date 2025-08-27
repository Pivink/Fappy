import File from "../models/File.js";
import { v2 as cloudinary } from "cloudinary";
import User from '../models/User.js';
import Folder from '../models/Folder.js';

export async function deleteFromCloudinary(fileUrl) {
  try {
    const parts = fileUrl.split("/");
    const fileWithExt = parts[parts.length - 1];
    const publicId = fileWithExt.substring(0, fileWithExt.lastIndexOf("."));

    await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted from Cloudinary: ${publicId}`);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
}

export const createFile = async (req, res) => {
  try {
    console.log("create file route",req.body)
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    let { parent } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const base64File = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64File}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `Fappy/${user.name}`,
      resource_type: "auto", 
    });

    const newFile = new File({
      name: req.file.originalname,
      type: req.file.mimetype.includes("image")
        ? "image"
        : req.file.mimetype.includes("video")
        ? "video"
        : req.file.mimetype.includes("pdf") || req.file.mimetype.includes("doc")
        ? "document"
        : "other",
      size: req.file.size,
      url: result.secure_url,
      createdBy: userId,
      parent: parent,  
    });

    await newFile.save();
    console.log("New File: ", newFile);

    if (parent) {
      const folder = await Folder.findById(parent);
      folder.files.push(newFile._id);
      await folder.save();
    }

    res.status(201).json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("Upload File Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
     const files = await File.find({ createdBy: req.params.id });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function deleteFileOne(req, res) {
  try {
     const file = await File.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!file) return res.status(404).json({ error: "File not found" });


    await deleteFromCloudinary(file.url);

    await file.deleteOne();

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
}


export async function deleteFile(fileId) {
  const file = await File.findOne({ _id: fileId, createdBy: userId });
  if (!file) return;


  try {

    const publicId = file.url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }

  await File.deleteOne({ _id: fileId, createdBy: userId });
}

export const updateFile = async (req, res) => {
  try {
    console.log("rename file: ",req.body,"--",req.params)
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;
    if (!id || !name) {
      return res.status(400).json({ error: "File ID and new name are required!" });
    }

    const file = await File.findOneAndUpdate(
      { _id: id, createdBy: userId },
      { name: name.name },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ error: "File not found or not authorized!" });
    }

    res.status(200).json({ message: "File updated successfully", file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
