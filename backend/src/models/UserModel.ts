import mongoose, { Document, Schema, Model } from 'mongoose';
import WishlistModel from '../models/wishList.model';
import AddressModel from '../models/address.model';
import Cart from '../models/cart.model';

// Define the TypeScript interfaces
export interface IPaymentMethod {
    _id?: mongoose.Types.ObjectId;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

export interface IUser extends Document {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    isAdmin: boolean;
    paymentMethods: IPaymentMethod[];
    img?: string; // Optional img field
}

// Define the PaymentMethod Schema
const PaymentMethodSchema: Schema<IPaymentMethod> = new Schema({
    cardNumber: { type: String, required: true },
    cardName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
});

// Create the User Schema
const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    paymentMethods: {
        type: [PaymentMethodSchema],
        required: true,
    },
    img: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-8e38e.appspot.com/o/1727086849041Media%20(1).jpg?alt=media&token=dfbce165-0319-4321-9f66-f839bfd9bd95', // Default No Avatar image URL
    },
}, { timestamps: true });

// Pre-delete hook to remove associated entries
UserSchema.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()["_id"];
    await WishlistModel.deleteMany({ userId });
    await AddressModel.deleteMany({ userId });
    await Cart.deleteMany({ userId });
    next();
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
