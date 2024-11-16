import express from 'express';
import * as postController from '../../controllers/Post/post.js';
import { authenticateToken } from 'middlewares/auth.js';

const postRouter = express.Router();

postRouter.post('/publish_post', authenticateToken, postController.publish);

postRouter.get('/getPosts', authenticateToken, postController.getPosts);

postRouter.post('/delete_post', authenticateToken, postController.deletePost);

postRouter.post('/update_post', authenticateToken, postController.updatePost);
export default postRouter;