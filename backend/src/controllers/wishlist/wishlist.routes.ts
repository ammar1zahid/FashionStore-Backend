import express from 'express';
import WishlistController from './wishlist.controller';
import { verifyUser, verifyAdmin } from '../../middlewares/verifyToken';
import { validate } from '../../middlewares/validation'; 
import { createOrUpdateWishlistValidator, deleteWishlistValidator } from './wishlist.validator';

const wishlistRouter = express.Router();

// Create Wishlist Entry route with validation
wishlistRouter.post("/:id", 
    verifyUser,
    validate(createOrUpdateWishlistValidator, 'body'), 
    WishlistController.createWishlistEntry
);

// Update Wishlist Entry route with validation
wishlistRouter.put("/:id/:entryId", 
    verifyUser,
    validate(createOrUpdateWishlistValidator, 'body'), 
    WishlistController.updateWishlistEntry
);

// Delete Wishlist Entry route with validation
wishlistRouter.delete("/:id/:entryId", 
    verifyUser,
    validate(deleteWishlistValidator, 'params'), 
    WishlistController.deleteWishlistEntry
);

// Get Wishlist for a User
wishlistRouter.get("/:id", verifyUser, WishlistController.getUserWishlist);

// Get All Wishlist Entries (for admin)
wishlistRouter.get("/", verifyAdmin, WishlistController.getAllWishlistEntries);

export default wishlistRouter;
