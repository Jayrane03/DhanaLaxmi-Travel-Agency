import express from 'express';
import { getUser, loginUser, registerUser } from '../controller/auth-cont.js';
import {auth} from '../middleware/auth.js';
// import authMiddleware from '../middleware/auth.js';
const router = express.Router();


router.post("/signup",registerUser);
router.post("/signin",loginUser);
router.get("/home", auth, getUser);


export default router;