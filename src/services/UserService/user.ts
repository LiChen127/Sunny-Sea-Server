import jwt from 'jsonwebtoken';
import { User } from '../../models/User.js';
import { JWT_EXPIRATION, JWT_SECRET } from '../../middlewares/auth.js';
import logger from '../../utils/logger.js';
import { handleHashPassword, comparePassword } from '../../utils/encryption.js';

export const register = async (username: string, password: string, role: string): Promise<User> => {
  // 哈希加密密码
  const hashPassword = await handleHashPassword(password);
  const user = await User.create({
    username,
    password: hashPassword,
    role,
  });
  logger.info(`用户开始注册, id: ${user.id}`);
  return user;
};

export const login = async (username: string, password: string, role: string) => {
  const conrrectPasswordByValid = await comparePassword(password, 'hashPassword');

  if (!conrrectPasswordByValid) {
    logger.error(`用户登录失败, 用户名: ${username}, 密码错误`);
  }

  const token = jwt.sign({ username, role: role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
}