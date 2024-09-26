import CommentModel, { IComment } from '../models/comments.model';

// Service for Comment operations
class CommentService {
    async addComment(userId: string, productId: string, comment: string): Promise<IComment> {
        const commentNew = new CommentModel({ userId, productId, comment });
        return await commentNew.save();
    }

    async deleteComment(commentId: string): Promise<IComment | null> {
        return await CommentModel.findByIdAndDelete(commentId);
    }

    async fetchCommentsByProduct(productId: string): Promise<IComment[]> {
        return await CommentModel.find({ productId }).populate('userId', 'username img'); // Populate user details
    }

    async fetchCommentsByUser(userId: string): Promise<IComment[]> {
        return await CommentModel.find({ userId }).populate('productId').populate('userId', 'name img'); // Populate product and user details
    }
}

export default new CommentService();
