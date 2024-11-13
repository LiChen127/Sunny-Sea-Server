import express from "express";
import userRouter from "./User/user.js";
import userProfileRouter from "./UserProfile/userProfile.js";
import logger from "../utils/logger.js";
// import { authenticateToken } from "../middlewares/auth.js";
const router = express.Router();
// 用户基本模块
router.use('/user', userRouter);

// router.use('/profile', authenticateToken, require('./UserProfile/userProfile.js'))

// 用户信息模块
router.use('/profile', userProfileRouter);

export default router;