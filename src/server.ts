/// <reference path="../types/express/index.d.ts" />
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import redis from './config/redis.js';
import router from './routes/index.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sessionConfig from './config/session.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// 同步数据库
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
