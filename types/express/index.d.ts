import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { username: string; role: string }; // 扩展 Request 类型，添加 user 属性
    }
  }
}
