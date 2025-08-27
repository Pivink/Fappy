import Folder from "../models/Folder.js";
import File from "../models/File.js";
import { deleteFile } from "./fileController.js";

export const createFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const { id } = req.user;


    const folder = new Folder({
      name,
      parent: parent || null,
      createdBy: id,
    });

    const savedFolder = await folder.save();


    if (parent) {
      await Folder.findByIdAndUpdate(parent, {
        $push: { subFolders: savedFolder._id },
      });
    }

    res.status(201).json(savedFolder);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getUserFolders = async (req, res) => {
  try {
    // console.log("Folder Route get by user: ", req.params);
    const { id } = req.params;
    const folders = await Folder.find({ createdBy: id })
      .populate("subFolders")
      .populate("files");
    // console.log("Rsult of folders: ",folders);
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getFolderById = async (req, res) => {
  try {
    // console.log("Folder Route get by id: ", req.params);

    const folder = await Folder.findById(req.params.id)
      .populate("subFolders")
      .populate("files");

    if (!folder) return res.status(404).json({ error: "Folder not found" });

    res.status(200).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Folder.findByIdAndUpdate(
      req.params.id,
      { name: name.name },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Folder not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


async function deleteFolderRecursively(folderId, userId) {
  const files = await File.find({ _id: folderId, createdBy: userId });
  for (const file of files) {
    await deleteFile(file._id, userId);
  }

  const subfolders = await Folder.find({ parent: folderId, createdBy: userId });
  for (const sub of subfolders) {
    await deleteFolderRecursively(sub._id, userId);
  }

  await Folder.deleteOne({ _id: folderId, createdBy: userId });
}


export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;


    const folder = await Folder.findOne({ _id: id, createdBy: userId });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    await deleteFolderRecursively(id, userId);

    res.status(200).json({ message: "Folder and all its subfolders/files deleted" });
  } catch (err) {
    console.error("Delete Folder Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};