import WishlistModel from '../models/wishList.model';
import { IWishlist } from '../models/wishList.model';

class WishlistService {
    // Create Wishlist Entry
    public static async createWishlistEntry(userId: string, productId: string): Promise<IWishlist> {
        const existingWishlistEntry = await WishlistModel.findOne({ userId, productId });
        if (existingWishlistEntry) {
            throw new Error('Product is already in the wishlist');
        }

        const newWishlistEntry = new WishlistModel({ userId, productId });
        return await newWishlistEntry.save();
    }

    // Update Wishlist Entry
    public static async updateWishlistEntry(userId: string, wishlistId: string, updateData: Partial<IWishlist>): Promise<IWishlist | null> {
        const wishlistEntry = await WishlistModel.findById(wishlistId);
        if (!wishlistEntry) {
            throw new Error('Wishlist entry not found');
        }

        if (wishlistEntry.userId.toString() !== userId) {
            throw new Error('Unauthorized to update this entry');
        }

        return await WishlistModel.findByIdAndUpdate(wishlistId, { $set: updateData }, { new: true });
    }

    // Delete Wishlist Entry
    public static async deleteWishlistEntry(userId: string, productId: string): Promise<void> {
        // Find the wishlist entry by userId and productId
        const wishlistEntry = await WishlistModel.findOne({ userId, productId });
        
        if (!wishlistEntry) {
            throw new Error('Wishlist entry not found');
        }
    
        // Check if the user is authorized to delete this entry
        if (wishlistEntry.userId.toString() !== userId) {
            throw new Error('Unauthorized to delete this entry');
        }
    
        // Delete the wishlist entry by its ID
        await WishlistModel.findByIdAndDelete(wishlistEntry._id);
    }
    

    // Get Wishlist for a User
    public static async getUserWishlist(userId: string): Promise<IWishlist[]> {
        return await WishlistModel.find({ userId }).populate('productId');
    }

    // Get All Wishlist Entries
    public static async getAllWishlistEntries(): Promise<IWishlist[]> {
        return await WishlistModel.find().populate('userId').populate('productId');
    }
}

export default WishlistService;
