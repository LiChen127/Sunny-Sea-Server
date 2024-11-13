import express from 'express';

import * as userProfileController from '../../controllers/UserProfile/userProfile.js';
import logger from '../../utils/logger.js';
import { authenticateToken } from '../../middlewares/auth.js';
const userProfileRouter = express.Router();

userProfileRouter.post('/upload', authenticateToken, (req, res) => {
  logger.info(req);
  userProfileController.upload(req, res);
})

export default userProfileRouter;