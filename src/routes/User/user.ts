import express, { Request, Response } from 'express';
import * as userController from '../../controllers/User/user.js';
import { authenticateToken } from '../../middlewares/auth.js';
import logger from '../../utils/logger.js';

const userRouter = express.Router();
userRouter.post('/register', (req, res) => {
  logger.info(req);
  userController.register(req, res);
});
userRouter.post('/login', userController.login);
userRouter.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

export default userRouter;
