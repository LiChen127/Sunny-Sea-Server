import { Post } from "models/Post.js";
import { UserProfile } from "models/UserProfile.js";
import logger from "utils/logger.js";
import { Op } from "sequelize";
import {
  PublishPostRequest,
  PublishPostSuccessResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdateRequest,
  PostArrType
} from "./type/index.js";
import redis from "config/redis.js";

export const publish = async (publishDetail: PublishPostRequest): Promise<PublishPostSuccessResponse | null> => {
  const { userId, content, title, tag } = publishDetail;
  if (!userId || !content || !title || !tag) {
    logger.error('发布失败, 信息不完整');
    return null;
  }
  try {
    const user = await UserProfile.findAll({
      where: {
        userId: userId,
      }
    });
    if (user.length <= 0) {
      logger.error(`用户发帖失败,用户不存在 userId: ${userId}`);
      return null;
    }
    const post = await Post.create({
      userId: userId,
      content: content,
      title: title,
      tag: tag
    });

    // 将帖子存入redis
    const postKey = `user:${userId}:posts`;
    await redis.hset(postKey, post.postId, JSON.stringify(post));
    logger.info(`用户 ${userId} 发布了帖子 ${post.id}`);
    return {
      id: post.id,
      postId: post.postId,
      userId: post.userId
    }
  } catch (error) {
    logger.error(`用户发帖失败,userId: ${userId},error: ${error}`);
    return null;
  }
}
export const getPosts = async (getPostsRequest: GetPostsRequest): Promise<GetPostsResponse | any[]> => {
  const { userId, page, pageSize, tag, title } = getPostsRequest;
  console.log(userId, page, pageSize, tag, title);
  if (!userId) {
    logger.error('缺少userId');
    return [];
  }
  try {
    const offset = page && pageSize ? (page - 1) * pageSize : 0;
    const limit = pageSize ? Number(pageSize) : 10;
    logger.info(`userId: ${userId}查找帖子`);

    // 先从redis里面获取
    const postKey = `user:${userId}:posts`;
    const cachePosts = await redis.hvals(postKey);
    console.log(cachePosts);
    if (cachePosts.length) {
      const posts = cachePosts.map((post) => JSON.parse(post));
      return {
        posts,
        total: posts.length
      }
    }
    // 如果缓存没有，查询数据库
    const where: any = {};
    if (tag) {
      where.tag = tag;
    }
    if (title) {
      where.title = { [Op.like]: `%${title}%` };
    }

    const result = await Post.findAndCountAll({
      where,
      offset,
      limit,
    });

    // 将查询到的帖子缓存到Redis
    for (const post of result.rows) {
      await redis.hset(postKey, post.postId, JSON.stringify(post));
    }

    const posts = result.rows.map((item) => ({
      id: item.id,
      content: item.content,
      tag: item.tag,
      title: item.title,
      likes: item.likes,
      postId: item.postId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return {
      posts,
      total: result.count,
    };
  } catch (error) {
    logger.error('Error in getPosts:', error.message, error.stack);
    return null;
  }
};

export const deletePost = async (postId: string, userId: string): Promise<boolean> => {
  if (!postId || !userId) {
    logger.error('删除帖子失败，信息不完整');
    return false;
  }
  try {
    const postKey = `user:${userId}:posts`;
    const backupKey = `user:${userId}:backup_posts`;
    // 从数据库删除
    const result = await Post.destroy({
      where: {
        postId: postId
      }
    })
    if (result) {
      // 从缓存删除并备份
      const post = await redis.hget(postKey, postId);
      if (post) {
        await redis.hdel(postKey, postId);
        await redis.hset(backupKey, postId, post); // 备份
        logger.info(`${userId} 删除 ${postId}帖子 成功, 备份${backupKey}成功`);
      }
      return true;
    } else {
      logger.error(`${userId} 删除 ${postId}帖子失败， 帖子不存在`);
      return false;
    }
  } catch (error) {
    logger.error(`删除失败, ${error} postId: ${postId}, userId: ${userId}`);
    return false;
  }
}

export const updatePost = async (publishDetail: UpdateRequest): Promise<boolean> => {
  const { content, tag, title, userId, postId } = publishDetail;
  if (!userId || !postId) {
    logger.error('参数缺失');
    return false;
  }
  try {
    const posts = await Post.findAll({
      where: {
        postId: postId
      }
    })
    if (posts.length <= 0) {
      logger.error('帖子不存在');
      return false;
    }
    if (posts.length > 1) {
      logger.error('帖子id有问题');
      return false;
    }
    const post = posts[0];
    await post.update({
      content: content,
      title: title,
      tag: tag
    });
    logger.info(`userId: ${userId}, postId${postId}update post success`);
    // 更新redis
    const postKey = `user:${userId}:posts`;
    await redis.set(postKey, JSON.stringify(post));
    return true;
  } catch (error) {
    logger.error(`userId: ${userId}, postId${postId}update post failure`);
    return false;
  }
}

