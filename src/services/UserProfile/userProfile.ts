import { error } from "console";
import { UserProfile } from "../../models/UserProfile.js";
import logger from "../../utils/logger.js";
import { UserProfileDetail, UpdateUserProfileDetailRequest, UpdateUserProfileResponse, getProfileResponse } from "./type/index.js";


export const upload = async (userProfileDetail: UserProfileDetail): Promise<UserProfile | null> => {
  const { id, nickname, gender, birthDate, occupation, region } = userProfileDetail;
  try {
    // 保证信息完整
    // 保证用户id唯一性
    const userProfile = await UserProfile.findOne({ where: { userId: id } });
    if (userProfile) {
      logger.error('用户信息上传失败, 用户id已存在');
      return null;
    }
    if (!id || !nickname || !gender || !birthDate || !occupation || !region) {
      logger.error('用户信息上传失败, 信息不完整');
      return null;
    }
    const detail = await UserProfile.create({
      userId: id,  // 使用用户的 id 作为外键
      nickname,
      gender,
      birthDate,
      occupation,
      region,
    });

    logger.info(`用户信息上传成功, 昵称: ${nickname}`);
    return detail;
  } catch (error) {
    logger.error(`用户信息上传失败, 昵称: ${nickname}, 错误信息: ${error}`);
    return null;
  }
}

export const update = async (userProfileDetail: UpdateUserProfileDetailRequest): Promise<UpdateUserProfileResponse> => {
  const { userId, nickname, gender, birthDate, occupation, region } = userProfileDetail;
  try {
    // 保证信息完整
    if (!userId || !nickname || !gender || !birthDate || !occupation || !region) {
      logger.error('用户信息上传失败, 信息不完整');
      return {
        code: 400,
        data: {
          error: '信息不完整'
        },
        message: '信息不完整'
      };
    }
    const userProfile = await UserProfile.findOne({ where: { userId: userId } });
    if (!userProfile) {
      logger.error('用户信息上传失败, 用户不存在');
      return {
        code: 400,
        data: {
          error: '用户不存在'
        },
        message: '用户不存在'
      };
    }
    const res = await userProfile.update({
      nickname,
      gender,
      birthDate,
      occupation,
      region,
    });
    logger.info(`用户信息更新成功, userId: ${userId}`);
    return {
      code: 200,
      data: {
        id: res.id,
        userId: res.userId
      },
      message: '更新成功'
    };
  } catch (error) {
    logger.error(`用户信息上传失败, userId: ${userId}昵称: ${nickname}, 错误信息: ${error}`);
    return {
      code: 500,
      data: {
        error: '服务器错误'
      },
      message: '服务器错误'
    }
  }
}

export const getProfile = async (userId: string): Promise<getProfileResponse> => {
  if (!userId) {
    return {
      code: 400,
      data: {
        error: '用户id为空'
      },
      message: '用户id为空'
    };
  }
  try {
    const userProfile = await UserProfile.findOne({ where: { userId: userId } });
    logger.info(`用户信息获取成功, userId: ${userId}`);
    if (!userProfile) {
      return {
        code: 400,
        data: {
          error: '用户不存在'
        },
        message: '用户不存在'
      };
    }
    return {
      code: 200,
      data: {
        userId: userProfile.userId,
        nickname: userProfile.nickname,
        gender: userProfile.gender,
        birthDate: userProfile.birthDate,
        occupation: userProfile.occupation,
        region: userProfile.region
      },
      message: '获取成功'
    };
  } catch (error) {
    logger.error(`用户信息获取失败, userId: ${userId}, 错误信息: ${error}`);
    return {
      code: 500,
      data: {
        error: '服务器错误'
      },
      message: '服务器错误'
    };
  }
}