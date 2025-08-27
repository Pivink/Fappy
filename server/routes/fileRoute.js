import express from 'express';
import upload from '../middlewares/multer.js';  
import authUser from '../middlewares/authUser.js';
import { 
  createFile, 
  getFiles, 
  deleteFileOne, 
  updateFile 
} from '../controllers/fileController.js';

const fileRouter = express.Router();

fileRouter.post('/upload',authUser, upload.single('file'), createFile);
fileRouter.get('/:id',authUser, getFiles);
fileRouter.delete('/delete/:id',authUser, deleteFileOne);
fileRouter.put('/update/:id',authUser, updateFile);

export default fileRouter;
