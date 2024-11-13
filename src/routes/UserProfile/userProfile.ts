import express from 'express';

import * as userProfileController from '../../controllers/UserProfile/userProfile.js';
import { authenticateToken } from '../../middlewares/auth.js';
const userProfileRouter = express.Router();

userProfileRouter.post('/upload', authenticateToken, (req, res) => {
  userProfileController.upload(req, res);
})
userProfileRouter.post('/update', authenticateToken, (req, res) => {
  userProfileController.update(req, res);
})
export default userProfileRouter;