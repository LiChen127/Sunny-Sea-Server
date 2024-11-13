import { NextFunction, Request, Response } from 'express';
import * as userProfileServices from '../../services/UserProfile/userProfile.js';
import logger from '../../utils/logger.js';
import { validate } from "uuid";
import { handleReturn } from '../../utils/handleReturn.js';

export const upload = async (req: Request, res: Response): Promise<any> => {
  try {
    const detail = req.body;
    // 校验一次id
    const { id } = detail;
    if (!validate(id)) {
      return handleReturn(400, null, '用户id不合法', res);
    }
    const response = await userProfileServices.upload(detail);
    if (response) {
      logger.info(`request body: ${detail} 用户信息上传成功`)
      return handleReturn(201, response, '用户信息上传成功', res);
    } else {
      logger.error(`request body: ${detail} 用户信息上传失败`)
      return handleReturn(400, null, '用户信息上传失败', res);
    }
  } catch (error) {
    logger.error(error);
    return handleReturn(500, null, '服务器错误', res);
  }
}
export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    logger.info(req.baseUrl);
    const response = await userProfileServices.update(req.body);
    if (response.code === 200) {
      return handleReturn(response.code, response.data, response.message, res);
    }
    if (response.code === 500) {
      return handleReturn(response.code, response.data, response.message, res);
    }
    return handleReturn(400, null, '用户信息更新失败', res);
  } catch (error) {
    logger.error(error);
    return handleReturn(500, null, '服务器错误', res);
  }
}