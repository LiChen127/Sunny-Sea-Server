import { UserProfile } from "../../models/UserProfile.js";
import logger from "../../utils/logger.js";
import { UserProfileDetail } from "./type/index.js";


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
