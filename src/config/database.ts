import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  }
)

// 初始化模型
User.initModel(sequelize);

export default sequelize;