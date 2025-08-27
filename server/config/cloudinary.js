import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

export const blogImageStorage = multer.memoryStorage();

export const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
};