import logger from "utils/logger.js";
import * as CommentServices from '../../services/Comment/comment.js';
import { Request, Response } from "express";
import { handleReturn } from "utils/handleReturn.js";
export const publishComment = async (req: Request, res: Response) => {
  try {
    logger.info(req.baseUrl);
    const response = await CommentServices.publishComment(req.body);
    if (response) {
      return handleReturn(200, null, '评论成功', res);
    }
    return handleReturn(400, null, '评论失败', res);
  } catch (error) {
    return handleReturn(500, null, '服务器错误', res);
  }
}

export const getAllCommentsByPostId = async (req: Request, res: Response) => {
  try {
    logger.info(req.baseUrl);
    const response = await CommentServices.getAllCommentsByPostId(req.params.postId);
    return handleReturn(200, response, null, res);
  } catch (error) {
    return handleReturn(500, null, '服务器错误', res);
  }
}

export const getCommentsByUserId = async (req: Request, res: Response) => {
  try {
    logger.info(req.baseUrl);
    const response = await CommentServices.getCommentsByUserId(req.params.userId);
    return handleReturn(200, response, null, res);
  } catch (error) {
    return handleReturn(500, null, '服务器错误', res);
  }
}


export const deleteComment = async (req: Request, res: Response) => {
  try {
    logger.info(req.baseUrl);
    const { userId, postId, id } = req.params;
    const response = await CommentServices.deleteComment(String(userId), String(postId), String(id));
    return handleReturn(200, response, null, res);
  } catch (error) {
    logger.error(error);
    return handleReturn(500, null, '服务器错误', res);
  }
}