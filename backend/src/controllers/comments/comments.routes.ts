import express from 'express';
import CommentController from './comments.controller';

const router = express.Router();

// Routes for Comments
router.post('/', CommentController.addComment); // Add a new comment
router.delete('/:commentId', CommentController.deleteComment); // Delete a comment
router.get('/product/:productId', CommentController.fetchCommentsByProduct); // Fetch comments by product
router.get('/user/:userId', CommentController.fetchCommentsByUser); // Fetch comments by user

export default router;
