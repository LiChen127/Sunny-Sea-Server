import express from 'express';
import * as commentController from '../../controllers/Comment/comment.js';
const commentRouter = express.Router();

commentRouter.post('/publish', commentController.publishComment);

commentRouter.get('/getCommentsByUserId/:userId', commentController.getCommentsByUserId);

commentRouter.get('/getAllCommentsByPostId/:postId', commentController.getAllCommentsByPostId);

commentRouter.delete('/deleteComment/:userId/:postId/:id', commentController.deleteComment);
export default commentRouter;