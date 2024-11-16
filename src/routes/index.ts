import express from "express";
import userRouter from "./User/user.js";
import userProfileRouter from "./UserProfile/userProfile.js";
import postRouter from "./Post/post.js";
import commentRouter from "./Comment/comment.js";
import redis from "config/redis.js";
import connectRabbitMQ from "config/rabbitmq.js";
// import { authenticateToken } from "../middlewares/auth.js";
const router = express.Router();
// 用户基本模块
router.use('/user', userRouter);
// 用户信息模块
router.use('/profile', userProfileRouter);
// 帖子模块
router.use('/post', postRouter);
// 评论模块
router.use('/comment', commentRouter);
router.get('/test-redis', async (req, res) => {
  try {
    // 测试设置一个 Redis 值
    await redis.set('test_key', 'Hello, Redis!');
    // 测试获取 Redis 值
    const value = await redis.get('test_key');
    res.json({ message: 'Redis test successful', value });
  } catch (err) {
    res.status(500).json({ message: 'Error connecting to Redis', error: err });
  }
});

router.get('/test-rabbitmq', async (req, res) => {
  try {
    const channel = await connectRabbitMQ();
    res.json({ message: 'RabbitMQ test successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error connecting to RabbitMQ', error: err });
  }
});
export default router;