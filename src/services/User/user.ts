import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';
import { JWT_EXPIRATION, JWT_SECRET_KEY } from '../../middlewares/auth.js';
import logger from '../../utils/logger.js';
import { handleHashPassword, comparePassword } from '../../utils/encryption.js';
export const register = async (username: string, password: string, role: string): Promise<User> => {
  // 如果数据库里已经注册过不能再注册
  const checkUser = await User.findOne({
    where: { username: username }
  })
  if (checkUser) {
    logger.error(`用户名 ${username} 已经被注册`);
    return null;
  }
  // 哈希加密密码
  const hashPassword = await handleHashPassword(password);
  const user = await User.create({
    username,
    password: hashPassword,
    role,
  });
  logger.info(`用户开始注册, id: ${user.id}, username: ${username}`);
  return user;
};

export const login = async (username: string, password: string, role: string): Promise<string> => {
  // 从数据库中找存储的哈希密码
  const storedHashedPassword = await User.findOne({
    where: { username: username },
    attributes: ['password']
  })
  const conrrectPasswordByValid = await comparePassword(password, storedHashedPassword.password);

  if (!conrrectPasswordByValid) {
    logger.error(`用户登录失败, 用户名: ${username}, 密码错误`);
    return 'password_error';
  }
  logger.info(`用户登录成功, 用户名: ${username}`);
  const token = jwt.sign({ username, role: role }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION });
  return token;
}