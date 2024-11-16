import { Comment } from "models/Comment.js";
import logger from "utils/logger.js";
import redis from "config/redis.js";
import {
  publishCommentDetail,
  GetCommentsResponse,
  CommentData
} from './types/index.js';

// 发布评论
export const publishComment = async (commentDetail: publishCommentDetail): Promise<boolean> => {
  const { content, postId, userId } = commentDetail;
  if (!content || !postId || !userId) {
    logger.error('参数缺失');
    return false;
  }
  try {
    const comment = await Comment.create({
      content: content,
      postId: postId,
      userId: userId
    });
    logger.info(`userId: ${userId}, postId: ${postId} publish comment success`);
    const commentPostIdKey = `post:${postId}:comments`;
    const commentUserIdKey = `user:${userId}:comments`;
    logger.info(`redis key: postId${commentPostIdKey}`);
    logger.info(`redis key: userId${commentUserIdKey}`);
    await redis.hset(commentPostIdKey, comment.id, JSON.stringify(comment));
    await redis.hset(commentUserIdKey, comment.id, JSON.stringify(comment));
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}
// 获取帖子所有的评论
export const getAllCommentsByPostId = async (postId: string): Promise<GetCommentsResponse> => {
  try {
    const commentPostIdKey = `post:${postId}:comments`;
    const comments = await redis.hvals(commentPostIdKey);
    if (comments.length > 0) {
      logger.info(`从redis获取评论成功, postId: ${postId}`);
      return {
        comments: comments.map((comment: string) => JSON.parse(comment)),
        total: comments.length
      }
    }
    const commentsBySearchFromDb = await Comment.findAndCountAll(
      {
        where: {
          postId
        },
        order: [['createdAt', 'DESC']]
      }
    );
    logger.info(`从数据库获取评论成功, postId: ${postId}`);
    // 过期了
    await redis.set(commentPostIdKey, JSON.stringify(commentsBySearchFromDb.rows));
    return {
      comments: commentsBySearchFromDb.rows,
      total: commentsBySearchFromDb.count
    }
  } catch (error) {
    logger.error(error);
    return null;
  }
}

// 获取用户评论
export const getCommentsByUserId = async (userId: string): Promise<Comment[] | null> => {
  try {
    logger.info(`查找userId: ${userId}评论`);
    const commentUserIdKey = `user:${userId}:comments`;
    const commentsFromRedis = await redis.hvals(commentUserIdKey);
    if (commentsFromRedis.length) {
      logger.info(`从redis userId${userId}获取评论成功`);
      return commentsFromRedis.map(item => JSON.parse(item));
    }
    logger.info(`从mysql userId: ${userId}获取评论`);
    const comments = await Comment.findAll({
      where: {
        userId
      },
      order: [['createdAt', 'DESC']]
    });
    await redis.hset(commentUserIdKey, userId, JSON.stringify(comments));
    return comments;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

// 删除评论
export const deleteComment = async (userId: string, postId: string, id: string): Promise<boolean> => {
  if (!userId || !postId || !id) {
    logger.error('删除评论失败，信息不完整');
    return false;
  }
  try {
    const commentPostIdKey = `post:${postId}:comments`;
    const commentUserIdKey = `user:${userId}:comments`;
    const commentbackupKey = `user:${userId}:backup_comments`;
    // 去拿缓存两个
    const cacheByPostId = await redis.hget(commentPostIdKey, id);
    const cacheByUserId = await redis.hget(commentUserIdKey, id);
    // 删除
    if (cacheByPostId) {
      logger.info(`从redis PostId缓存中删除评论, userId:${userId}, postId: ${postId}, id: ${id}`);
      await redis.hdel(commentPostIdKey, id);
      await redis.hset(commentbackupKey, id, cacheByUserId);
    }
    if (cacheByUserId) {
      logger.info(`从redis UserId缓存中删除评论, userId:${userId}, postId: ${postId}, id: ${id}`);
      await redis.hdel(commentUserIdKey, id);
      await redis.hset(commentbackupKey, id, cacheByUserId);
    }
    // 从数据库中删除
    logger.info(`从数据库中删除评论, id: ${id}`);
    await Comment.destroy({
      where: {
        id
      }
    });
    return true;
  } catch (error) {
    logger.error('删除评论失败', error);
    return false;
  }
}