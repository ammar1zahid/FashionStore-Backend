/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import CommentService from '../../service/comments.service';

class CommentController {
    async addComment(req: Request, res: Response) {
        const { userId, productId, comment } = req.body;

        try {
            const newComment = await CommentService.addComment(userId, productId, comment);
            return res.status(201).json(newComment);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteComment(req: Request, res: Response) {
        const { commentId } = req.params;

        try {
            const deletedComment = await CommentService.deleteComment(commentId);
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async fetchCommentsByProduct(req: Request, res: Response) {
        const { productId } = req.params;

        try {
            const comments = await CommentService.fetchCommentsByProduct(productId);
            return res.status(200).json(comments);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async fetchCommentsByUser(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const comments = await CommentService.fetchCommentsByUser(userId);
            return res.status(200).json(comments);
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new CommentController();
