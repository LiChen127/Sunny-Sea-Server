import { Post } from "models/Post.js";
import { UserProfile } from "models/UserProfile.js";
import logger from "utils/logger.js";
import { Op } from "sequelize";
import {
  PublishPostRequest,
  PublishPostSuccessResponse,
  GetPostsRequest,
  GetPostsResponse,
  PostArrType
} from "./type/index.js";

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
    return [];
  }
  try {
    const offset = page && pageSize ? (page - 1) * pageSize : 0;
    const limit = pageSize ? Number(pageSize) : 10;
    logger.info(`userId: ${userId}查找帖子`);

    const where: any = { userId };
    if (tag) {
      where.tag = tag;
    }
    if (title) {
      where.title = { [Op.like]: `%${title}%` };
    }
    const posts = await Post.findAndCountAll({
      where,
      offset,
      limit,
    });

    const resData: PostArrType[] = posts.rows.map((item) => ({
      id: item.id,
      content: item.content,
      tag: item.tag,
      title: item.title,
      likes: item.likes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    console.log(resData);

    if (posts.count > 0) {
      return {
        posts: resData,
        total: posts.count,
      };
    }
    return null;
  } catch (error) {
    logger.error('Error in getPosts:', error.message, error.stack);
    return null;
  }
};