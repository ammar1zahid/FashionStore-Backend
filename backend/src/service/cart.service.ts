import Cart, { ICart } from '../models/cart.model';
import User from '../models/UserModel';
import Product from '../models/product.model';

class CartService {
    public static async createCart(cartData: ICart): Promise<ICart> {
        const { userId, products } = cartData;

        // Check if the user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            throw new Error('User does not exist');
        }

        // Check if all products exist
        for (const item of products) {
            const productExists = await Product.findById(item.productId);
            if (!productExists) {
                throw new Error(`Product with ID ${item.productId} does not exist`);
            }
        }

        const newCart = new Cart(cartData);
        return newCart.save();
    }

    public static async updateCart(cartId: string, cartData: ICart): Promise<ICart | null> {
        const { userId, products } = cartData;

        // Check if the user exists
        if (userId) {
            const userExists = await User.findById(userId);
            if (!userExists) {
                throw new Error('User does not exist');
            }
        }

        // Check if all products exist
        if (products && products.length > 0) {
            for (const item of products) {
                const productExists = await Product.findById(item.productId);
                if (!productExists) {
                    throw new Error(`Product with ID ${item.productId} does not exist`);
                }
            }
        }

        return Cart.findByIdAndUpdate(cartId, { $set: cartData }, { new: true }).exec();
    }

    public static async deleteCart(cartId: string): Promise<ICart | null> {
        return Cart.findByIdAndDelete(cartId).exec();
    }

    public static async getCart(userId: string): Promise<ICart | null> {
        return Cart.findOne({ userId })
            .populate('userId', 'name email')
            .populate('products.productId', 'title price')
            .exec();
    }

    public static async getAllCarts(): Promise<ICart[]> {
        return Cart.find()
            .populate('userId', 'name email')
            .populate('products.productId', 'title price')
            .exec();
    }
}

export default CartService;
