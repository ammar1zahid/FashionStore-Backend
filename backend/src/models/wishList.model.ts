import mongoose, { Document, Schema, Model } from 'mongoose';

// interface for Wishlist
export interface IWishlist extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId; // Reference to Product ID
}

//  Wishlist Schema
const WishlistSchema: Schema<IWishlist> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true
    }
}, { timestamps: true });

// Create the Wishlist Model
const WishlistModel: Model<IWishlist> = mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default WishlistModel;
