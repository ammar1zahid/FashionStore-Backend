import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interfaces


export interface IOrder extends Document {
    userId: string;
    products: mongoose.Types.ObjectId;
    amount: number;
    address: mongoose.Types.ObjectId; // Reference to the Address model
    status?: string;
}

// Define the Mongoose Schema
const OrderSchema: Schema<IOrder> = new Schema(
    {
        userId: { 
            type: String, 
            required: true 
        },
        products: [
            {
                productId: { 
                    type: Schema.Types.ObjectId, 
                    ref: 'Product', 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    default: 1 
                },
                price: { 
                    type: Number,
                    required: true   
                },
            }
        ],
        amount: { 
            type: Number, 
            required: true 
        },
        address: { 
            type: Schema.Types.ObjectId, 
            ref: 'Address', // Reference to the Address model
            required: true 
        },
        status: { 
            type: String, 
            default: "pending" 
        },
    },
    { timestamps: true }
);

// Define and export the Mongoose model
const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
