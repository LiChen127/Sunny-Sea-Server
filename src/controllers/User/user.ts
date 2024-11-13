import { Request, Response } from 'express';
import * as userService from '../../services/User/user.js';
import logger from '../../utils/logger.js';
import { handleReturn } from '../../utils/handleReturn.js';
import { JWT_EXPIRATION } from '../../middlewares/auth.js';
import ms from 'ms';
import { UserLoginResponse } from '../../services/User/type/index.js';
export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password, role } = req.body;
    // 手机号正则测试
    const phoneRegx = /^1[3456789]\d{9}$/;
    if (!phoneRegx.test(username)) {
      return handleReturn(400, null, '手机号格式不正确', res);
    }
    const user = await userService.register(username, password, role);
    if (!user) {
      return handleReturn(400, null, '用户已存在', res);
    }
    logger.info(`用户 ${username} 注册成功, ID: ${user.id}`);
    return handleReturn(201, user, '注册成功', res);
  } catch (error) {
    logger.error('注册失败', error);
    return handleReturn(500, error, '注册失败', res);
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password, role } = req.body;
    const response = await userService.login(username, password, role);

    if (!response) {
      return handleReturn(401, null, '密码错误', res);
    }
    // 设置Cookie 存储token
    res.cookie('sunny_sea_token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ms(JWT_EXPIRATION),
    })

    // 保存session信息
    req.session.username = username;
    req.session.role = role;

    return handleReturn(200, { id: response.id, token: response.token }, '登录成功', res);
  } catch (err) {
    logger.error(`登录失败: ${err.message}`);
    return handleReturn(500, { err }, '登录失败', res);
  }
};