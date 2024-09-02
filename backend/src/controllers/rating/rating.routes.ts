import express from 'express';
import RatingController from './rating.controller';
import { validate } from '../../middlewares/validation'; 
import { addOrUpdateRatingValidator, deleteRatingValidator } from './rating.validator'; 

const router = express.Router();

// Add or Update Rating route with validation
router.post('/addOrUpdate', 
    validate(addOrUpdateRatingValidator, 'body'), 
    RatingController.addOrUpdateRating
);

// Delete Rating route with validation
router.delete('/:userId/:productId', 
    validate(deleteRatingValidator, 'params'), 
    RatingController.deleteRating
);

// Get User Product Rating route
router.get('/userProduct/:userId/:productId', RatingController.getUserProductRating);

// Get Product Rating route
router.get('/product/:pId', RatingController.getProductRating);

// Get All Product Ratings route
router.get('/all', RatingController.getAllProductRatings);

export default router;
