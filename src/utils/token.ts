import jwt from 'jsonwebtoken';

// 生成token
export const generateToken = (userId: string, secretKey: string, expiresIn: string = '1h'): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn });
};


// 验证token
export const verifyToken = (token: string, secretKey: string): string | jwt.JwtPayload => {
  return jwt.verify(token, secretKey); // 验证 JWT Token
};