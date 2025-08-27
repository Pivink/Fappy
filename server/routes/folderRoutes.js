import express from 'express';
import {
    createFolder,
    getUserFolders,
    getFolderById,
    updateFolder,
    deleteFolder
} from '../controllers/folderController.js';
import authUser from '../middlewares/authUser.js';

const Router = express.Router();

Router.post('/create/:id',authUser,createFolder);

Router.get('/getfolder/:id',authUser,getUserFolders);

Router.get('/getfolderid/:id',authUser,getFolderById);

Router.delete('/delete/:id',authUser,deleteFolder);

Router.put('/update/:id',authUser,updateFolder);

export default Router;