import { NextFunction, Request, Response } from 'express';
import * as userProfileServices from '../../services/UserProfile/userProfile.js';
import logger from '../../utils/logger.js';
import { validate } from "uuid";
export const upload = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const detail = req.body;
    // 校验一次id
    const { id } = detail;
    if (!validate(id)) {
      return {
        code: 400,
        data: null,
        message: '用户id不合法',
      }
    }
    next();
    const response = await userProfileServices.upload(detail);
    if (response) {
      logger.info(`request body: ${detail} 用户信息上传成功`)
      return {
        code: 201,
        data: response,
        message: '用户信息上传成功'
      }
    } else {
      logger.error(`request body: ${detail} 用户信息上传失败`)
      return {
        code: 400,
        data: null,
        message: '用户信息上传失败'
      }
    }
  } catch (error) {
    logger.error(error);
    return {
      code: 500,
      data: null,
      message: '服务器错误'
    }
  }
}