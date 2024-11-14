import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { UserProfile } from '../models/UserProfile.js';

dotenv.config();

// 使用环境变量配置数据库连接
const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  dialect: 'mysql',
  logging: false,
});

// 初始化模型
User.initModel(sequelize);
UserProfile.initModel(sequelize);

// 关联模型
User.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;
