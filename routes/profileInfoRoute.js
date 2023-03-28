import express from 'express';
import { getProfileInfo } from '../controllers/user.js';
import { verifyToken } from '../middlewares/authJwt.js';
import { addCertification } from '../controllers/profileinfo.js';

const router = express.Router();

router.get('/', verifyToken, getProfileInfo);
router.put('/certifications', verifyToken, addCertification);

export default router;
