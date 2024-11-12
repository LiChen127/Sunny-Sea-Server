import express, { Request, Response } from 'express';
import * as userController from '../../controllers/User/userController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const userRouter = express.Router();
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

export default userRouter;
