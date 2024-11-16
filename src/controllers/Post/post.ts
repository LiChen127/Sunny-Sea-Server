import * as postServices from '../../services/Post/post.js';
import logger from 'utils/logger.js';
import { Request, Response } from 'express';
import { handleReturn } from 'utils/handleReturn.js';
import { PublishPostRequest, PublishPostSuccessResponse } from '../../services/Post/type/index.js';

export const publish = async (req: Request, res: Response): Promise<any> => {
  try {
    logger.info(req.baseUrl);
    const requestDetail: PublishPostRequest = req.body;
    if (!requestDetail) {
      return handleReturn(400, null, '参数错误', res);
    }
    const response = await postServices.publish(requestDetail);
    if (!response) {
      return handleReturn(500, null, '服务器错误', res);
    } else {
      return handleReturn(200, response, '发布成功', res);
    }
  } catch (error) {
    return handleReturn(500, null, '服务器错误', res);
  }
}

export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    logger.info(req.baseUrl);
    const query = req.query;
    if (!query.userId && query.userId === undefined) {
      return handleReturn(400, null, '缺少userId', res);
    }
    const response = await postServices.getPosts(query);
    console.log(response);
    if (!response) {
      return handleReturn(400, null, '请求参数有问题', res);
    }
    return handleReturn(200, response, '请求成功', res);
  } catch (error) {
    logger.error(error);
    return handleReturn(500, null, '服务器错误', res);
  }
}

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    logger.info(req.baseUrl);
    const { id, userId } = req.body;
    if (!id || !userId) {
      return handleReturn(400, null, '请求参数缺失', res);
    }
    const response = await postServices.deletePost(id as string, userId as string);
    if (response) {
      return handleReturn(200, null, '删除成功', res);
    }
    return handleReturn(400, null, '删除失败', res);
  } catch (error) {
    logger.error(error);
    return handleReturn(500, null, '服务器错误', res);
  }
}

export const updatePost = async (req: Request, res: Response): Promise<any> => {
  try {
    logger.info(req.baseUrl);
    const response = await postServices.updatePost(req.body);
    if (response) {
      return handleReturn(200, null, '更新成功', res);
    }
    return handleReturn(400, null, '更新失败', res);
  } catch (error) {
    return handleReturn(500, null, '服务器错误', res);
  }
}