import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h', // token 过期时间
  });
};

export const verifyToken = (token: string, secretKey: string) => {
  return jwt.verify(token, secretKey);
};
