import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.js';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      message: '没有token'
    });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET_KEY as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: '无效token'
    })
  }
}

export default authenticateToken;