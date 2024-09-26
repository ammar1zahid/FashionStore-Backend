import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for Comment
export interface IComment extends Document {
    userId: mongoose.Types.ObjectId; // Reference to User ID
    productId: mongoose.Types.ObjectId; // Reference to Product ID
    comment: string; // Comment message
}

// Comment Schema
const CommentSchema: Schema<IComment> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true
    },
    comment: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create the Comment Model
const CommentModel: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;
