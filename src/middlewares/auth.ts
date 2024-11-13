import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.js';
import { handleReturn } from '../utils/handleReturn.js';
import logger from '../utils/logger.js';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // 请求头中拿到token
  logger.info(req.baseUrl + 'token校验');
  const token = req.headers['authorization']?.trim();
  logger.info('token', token);
  if (token) {
    // 借助 token 验证器进行验证
    const decoded = verifyToken(token, JWT_SECRET_KEY);
    if (decoded) {
      // 将解码后的用户信息附加到 req.user 属性
      req.user = decoded;
      return next();
    } else {
      return handleReturn(401, null, '无效token', res);
    }
  } else if (req.session.username) {
    // 如果没有 Token，从 Session 获取用户信息
    req.user = { username: req.session.username, role: req.session.role };
    return next();
  } else {
    return handleReturn(401, null, '请登录', res);
  }
};

export const JWT_EXPIRATION = '1d';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
