import RatingModel, { IRating } from '../models/rating.model';
import mongoose from 'mongoose';

class RatingService {
    public static async addOrUpdateRating(userId: string, productId: string, rating: number): Promise<IRating> {
        const existingRating = await RatingModel.findOne({ userId, productId });

        if (existingRating) {
            existingRating.rating = rating;
            return existingRating.save();
        } else {
            const newRating: IRating = new RatingModel({ userId, productId, rating });
            return newRating.save();
        }
    }

    public static async deleteRating(userId: string, productId: string): Promise<void> {
        const deletedRating = await RatingModel.findOneAndDelete({ userId, productId }).exec();
        
        if (!deletedRating) {
            throw new Error('Rating not found');
        }
    }

    public static async getUserProductRating(userId: string, productId: string): Promise<IRating | null> {
        return RatingModel.findOne({ userId, productId }).exec();
    }

    public static async getProductRating(productId: string): Promise<unknown> {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('Invalid productId');
        }

        const productRating = await RatingModel.aggregate([
            { $match: { productId: new mongoose.Types.ObjectId(productId) } },
            {
                $group: {
                    _id: "$productId",
                    averageRating: { $avg: "$rating" },
                    totalRatings: { $sum: 1 }
                }
            }
        ]).exec();

        if (productRating.length === 0) {
            throw new Error('Product has no ratings');
        }

        return productRating[0];
    }

    public static async getAllProductRatings(): Promise<IRating[]> {
        return RatingModel.find().exec();
    }
}

export default RatingService;
