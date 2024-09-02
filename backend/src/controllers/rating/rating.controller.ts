import { Request, Response, NextFunction } from 'express';
import RatingService from '../../service/rating.service';
import createError from '../../middlewares/error';

class RatingController {
    public static async addOrUpdateRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId, productId, rating } = req.body;

        try {
            const result = await RatingService.addOrUpdateRating(userId, productId, rating);
            res.status(result.isNew ? 201 : 200).json({
                message: result.isNew ? 'Rating added successfully' : 'Rating updated successfully',
                rating: result
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async deleteRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await RatingService.deleteRating(req.params.userId, req.params.productId);
            res.status(200).json({ message: 'Rating deleted successfully' });
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(404, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getUserProductRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await RatingService.getUserProductRating(req.params.userId, req.params.productId);
            if (result) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'Rating not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getProductRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await RatingService.getProductRating(req.params.pId);
            res.status(200).json(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getAllProductRatings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await RatingService.getAllProductRatings();
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'No products with ratings found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }
}

export default RatingController;
