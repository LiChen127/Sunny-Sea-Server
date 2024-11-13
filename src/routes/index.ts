import express from "express";
import userRouter from "./User/user.js";
import logger from "../utils/logger.js";
const router = express.Router();
// 用户基本模块
router.use('/user', userRouter);




export default router;