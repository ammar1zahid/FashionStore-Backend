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

    public static async getAllProducts(query: { new?: string, category?: string }): Promise<IProduct[]> {
        const { new: qNew, category: qCategory } = query;
        let productsArray: IProduct[];

        if (qNew) {
            productsArray = await ProductModel.find().sort({ createdAt: -1 }).limit(5).exec();
        } else if (qCategory) {
            productsArray = await ProductModel.find({
                categories: { $in: [qCategory] }
            }).exec();
        } else {
            productsArray = await ProductModel.find().exec();
        }

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
