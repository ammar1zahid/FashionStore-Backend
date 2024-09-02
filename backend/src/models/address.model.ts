import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for Address
export interface IAddress extends Document {
    userId: mongoose.Types.ObjectId;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

// Address Schema
const AddressSchema: Schema<IAddress> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the Address Model
const AddressModel: Model<IAddress> = mongoose.model<IAddress>('Address', AddressSchema);

export default AddressModel;
