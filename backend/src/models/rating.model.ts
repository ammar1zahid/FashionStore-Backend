import mongoose, { Document, Schema, Model } from 'mongoose';

// interface for Wishlist
export interface IRating extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId; // Reference to Product ID
    rating: number; 
}

//  Wishlist Schema
const RatingSchema: Schema<IRating> = new Schema({
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
    rating: {
        type:Number,
        required: true,
    }
}, { timestamps: true });

// Create the Wishlist Model
const RatingModel: Model<IRating> = mongoose.model<IRating>('Rating', RatingSchema);

export default RatingModel;
