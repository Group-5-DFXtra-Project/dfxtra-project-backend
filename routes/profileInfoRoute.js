import express from 'express';
import { getProfile } from '../controllers/auth.js';
import {verifyToken} from '../middlewares/authJwt.js'


const router = express.Router();


router.get('/profile', verifyToken, getProfile);


export default router;