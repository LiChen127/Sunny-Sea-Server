import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import redis from './config/redis.js';
import logger from './utils/logger.js';
import router from './routes/index.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_session_secret', // 用于加密 session ID
    resave: false, // 不会在每次请求时重新保存 session
    saveUninitialized: false, // 如果 session 没有被修改，就不保存
    cookie: {
      httpOnly: true, // 防止客户端 JavaScript 访问 Cookie
      secure: process.env.NODE_ENV === 'production', // 在生产环境下使用 Secure Cookie
      maxAge: 24 * 60 * 60 * 1000, // Cookie 过期时间（1 天）
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// 同步数据库
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
