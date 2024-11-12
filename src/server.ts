import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import redis from './config/redis.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 同步数据库
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
