// routes/userRoutes.ts
import express, { Request, Response } from 'express';
import * as userController from '../../controllers/User/userController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
// userController.use(authenticateToken);
// 验证token
userRouter.get('/profile', (req: Request, res: Response): void => {
  res.status(200).json({
    message: '验证成功'
  });
})

export default userRouter;
