import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { UserProfile } from '../models/UserProfile.js';
import { Post } from 'models/Post.js';
import { Comment } from 'models/Comment.js';

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
Post.initModel(sequelize);
Comment.initModel(sequelize);

// 关联模型
User.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });
// userId对应多个post
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
// userId对应多个comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
// postId对应多个comment
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export default sequelize;
