import { Request, Response } from 'express';
import * as userService from '../../services/UserService/user.js';
import logger from '../../utils/logger.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const user = await userService.register(username, password, role);

    logger.info(`用户 ${username} 注册成功, ID: ${user.id}`);
    res.status(201).json({
      message: '注册成功',
    })
  } catch (error) {
    logger.error('注册失败', error);
    res.status(500).json({
      message: '注册失败',
    });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const user = await userService.login(username, password, role);

    logger.info(`用户 ${username}登录成功, ID: ${user.id}`);
    res.status(200).json({ message: '登录成功', token: user.token });
  } catch (err) {
    logger.error(`登录失败: ${err.message}`);
    res.status(400).json({ message: '登录失败', error: err.message });
  }
};