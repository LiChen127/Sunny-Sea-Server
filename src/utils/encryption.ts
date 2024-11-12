import bcrypt from 'bcryptjs';

// 加密密码
export const handleHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // 使用 10 轮盐
  const hashedPassword = await bcrypt.hash(password, salt); // 加密密码
  return hashedPassword;
};

// 校验密码
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};