import express from 'express';
import {
    loginUser,
    registration
} from '../controllers/authentication.js';

const authRoute=express.Router();

authRoute.post('/login',loginUser);

authRoute.post('/signup',registration);

export default authRoute;