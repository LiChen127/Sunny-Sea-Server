import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { UserProfile } from '../models/UserProfile.js';

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
);

// 初始化模型
User.initModel(sequelize);
UserProfile.initModel(sequelize);

// User用户表和UserProfile用户基本情况表一对一关联
User.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;
