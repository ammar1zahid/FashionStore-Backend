import mongoose from 'mongoose';
import ProductModel, { IProduct } from '../models/product.model';

class ProductService {
    public static async createProduct(productData: IProduct): Promise<IProduct> {
        try {
            const newProduct = new ProductModel(productData);
            return await newProduct.save();
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                console.error('Validation Error:', error);
                throw new Error('Validation failed for product creation');
            }
            throw error;
        }
    }


    public static async updateProduct(productId: string, productData: Partial<IProduct>): Promise<IProduct | null> {
        return ProductModel.findByIdAndUpdate(
            productId,
            { $set: productData },
            { new: true }
        ).exec();
    }

    public static async deleteProduct(productId: string): Promise<void> {
        await ProductModel.findByIdAndDelete(productId).exec();
    }

    public static async getProduct(productId: string): Promise<IProduct | null> {
        return ProductModel.findById(productId).exec();
    }

    // public static async getAllProducts(query: { new?: string, category?: string, page?: number, limit?: number }): Promise<IProduct[]> {
    //     const { new: qNew, category: qCategory, page = 1, limit = 8 } = query;
    //     let productsArray: IProduct[];

    //     const skip = (page - 1) * limit;

    //     if (qNew) {
    //         productsArray = await ProductModel.find()
    //             .sort({ createdAt: -1 })
    //             .limit(limit)
    //             .skip(skip)
    //             .exec();
    //     } else if (qCategory) {
    //         productsArray = await ProductModel.find({
    //             categories: { $in: [qCategory] }
    //         })
    //         .limit(limit)
    //         .skip(skip)
    //         .exec();
    //     } else {
    //         productsArray = await ProductModel.find()
    //             .limit(limit)
    //             .skip(skip)
    //             .exec();
    //     }

    //     return productsArray;
    // }

    public static async getAllProducts(query: { new?: string, category?: string, page?: string, limit?: string }) {
        const { new: qNew, category: qCategory, page = '1', limit = '8' } = query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        let productsArray: IProduct[];

        const queryConditions = qNew ? {} : qCategory ? { categories: { $in: [qCategory] } } : {};

        // Find total number of products based on the query
        const totalItems = await ProductModel.countDocuments(queryConditions);

        // Fetch the products with pagination
        // eslint-disable-next-line prefer-const
        productsArray = await ProductModel.find(queryConditions)
            .sort(qNew ? { createdAt: -1 } : {})
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .exec();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalItems / limitNumber);

        return {
            products: productsArray,
            totalPages,
            totalItems,
            currentPage: pageNumber
        };
    }


    public static async getAllProductsAdmin(): Promise<IProduct[]> {
        // Fetch all products without any conditions
        const productsArray: IProduct[] = await ProductModel.find().exec();
        return productsArray;
    }
    


    public static async getRecommendedProducts(productId: string): Promise<IProduct[]> {
        const product = await ProductModel.findById(productId).select('categories').exec();

        if (!product) {
            throw new Error('Product not found');
        }

        return ProductModel.find({
            categories: { $in: product.categories },
            _id: { $ne: productId }
        }).exec();
    }

    public static async getProductInventory(productId: string): Promise<IProduct[]> {
        return ProductModel.find({ _id: productId }).select('inventory').exec();
    }

    public static async getAllInventories(): Promise<IProduct[]> {
        return ProductModel.find().select('title inventory').exec();
    }
}

export default ProductService;
