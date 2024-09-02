import { Request, Response, NextFunction } from 'express';
import WishlistService from '../../service/wishlist.service';
import createError from '../../middlewares/error';

class WishlistController {
    // Create Wishlist Entry
    public static async createWishlistEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const { productId } = req.body;

            const wishlistEntry = await WishlistService.createWishlistEntry(userId, productId);
            res.status(201).json(wishlistEntry);
        } catch (err: unknown) {
            if (err instanceof Error && err.message === 'Product is already in the wishlist') {
                next(createError(400, err.message));
            } else {
                next(createError(500, err instanceof Error ? err.message : 'Server error'));
            }
        }
    }

    // Update Wishlist Entry
    public static async updateWishlistEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const wishlistId = req.params.entryId;
            const updatedWishlistEntry = await WishlistService.updateWishlistEntry(userId, wishlistId, req.body);

            if (!updatedWishlistEntry) {
                next(createError(404, 'Wishlist entry not found'));
                return;
            }

            res.status(200).json(updatedWishlistEntry);
        } catch (err: unknown) {
            if (err instanceof Error && err.message === 'Unauthorized to update this entry') {
                next(createError(403, err.message));
            } else {
                next(createError(500, err instanceof Error ? err.message : 'Server error'));
            }
        }
    }

    // Delete Wishlist Entry
    public static async deleteWishlistEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const wishlistId = req.params.entryId;

            await WishlistService.deleteWishlistEntry(userId, wishlistId);
            res.status(200).json({ message: 'Wishlist entry has been deleted' });
        } catch (err: unknown) {
            if (err instanceof Error && err.message === 'Unauthorized to delete this entry') {
                next(createError(403, err.message));
            } else if (err instanceof Error && err.message === 'Wishlist entry not found') {
                next(createError(404, err.message));
            } else {
                next(createError(500, err instanceof Error ? err.message : 'Server error'));
            }
        }
    }

    // Get Wishlist for a User
    public static async getUserWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const wishlist = await WishlistService.getUserWishlist(userId);

            if (wishlist.length === 0) {
                next(createError(404, 'No wishlist entries found for this user'));
                return;
            }

            res.status(200).json(wishlist);
        } catch (err: unknown) {
            next(createError(500, err instanceof Error ? err.message : 'Server error'));
        }
    }

    // Get All Wishlist Entries (for admin or debugging purposes)
    public static async getAllWishlistEntries(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const wishlistEntries = await WishlistService.getAllWishlistEntries();
            res.status(200).json(wishlistEntries);
        } catch (err: unknown) {
            next(createError(500, err instanceof Error ? err.message : 'Server error'));
        }
    }
}

export default WishlistController;
