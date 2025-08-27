import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/mongoDB.js';
import { connectCloudinary } from './config/cloudinary.js';
import fileRouter from './routes/fileRoute.js';
import folderRouter from './routes/folderRoutes.js';
import userRouter from './routes/userRoute.js';

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/f1/auth',userRouter);
app.use('/api/f1/folder',folderRouter);
app.use('/api/f1/file',fileRouter);


app.listen(port, () => console.log(`Server Running on : ${port}`))