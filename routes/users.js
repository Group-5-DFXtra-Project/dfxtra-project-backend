import express from 'express';
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//get User:So we're calling the getUser function and defining the route it will assume in our browser. localhost8000/api/users/find/:id..
router.get('/find/:id', getUser);



export default router;