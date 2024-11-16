import express from 'express';
import * as commentController from '../../controllers/Comment/comment.js';
import { authenticateToken } from 'middlewares/auth.js';
const commentRouter = express.Router();

commentRouter.post('/publish', authenticateToken, commentController.publishComment);

commentRouter.get('/getCommentsByUserId/:userId', authenticateToken, commentController.getCommentsByUserId);

commentRouter.get('/getAllCommentsBypostId/:postId', authenticateToken, commentController.getAllCommentsByPostId);

commentRouter.post('/deleteComment', authenticateToken, commentController.deleteComment);
export default commentRouter;