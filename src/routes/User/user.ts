import express, { Request, Response } from 'express';
import * as userController from '../../controllers/User/user.js';
import logger from '../../utils/logger.js';

const userRouter = express.Router();
userRouter.post('/register', (req, res) => {
  logger.info(req.baseUrl);
  userController.register(req, res);
});
userRouter.post('/login', (req, res) => {
  logger.info(req.baseUrl);
  userController.login(req, res);
});

export default userRouter;
