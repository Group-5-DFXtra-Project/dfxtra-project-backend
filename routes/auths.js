import express from "express";
import { signup } from "../controllers/auth.js";
import { signin } from "../controllers/auth.js";

const router = express.Router();
//We create this auth.js file and then import as an arbitrarily named route in our index.js
//We have siloed our signup function in a separate controller file and imported it here to avoid messiness.

router.post("/signup", signup);
router.post("/signin", signin);

export default router;