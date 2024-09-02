import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Define the interfaces
interface IProduct {
    productId: Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    products: IProduct[];
    createdAt: Date;
    updatedAt: Date;
}

// Define the Mongoose Schema
const CartSchema: Schema<ICart> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: [1, 'Quantity can not be less then 1.'],
                },
            },
        ],
    },
    { timestamps: true }
);

// Define and export the Mongoose model
const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);
export default Cart;
