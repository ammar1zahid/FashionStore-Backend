import mongoose, { Document, Schema } from 'mongoose';

// Define the Product interface
export interface IProduct extends Document {
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size?: string[];
    color?: string[];
    price: number;
    inventory:number;
    inStock:boolean;
}

// Define the Product schema
const ProductSchema: Schema<IProduct> = new Schema(
    {
        title: { 
            type: String, 
            required: true, 
            unique: true 
        },
        desc: { 
            type: String, 
            required: true, 
        },
        img: { 
            type: String, 
            required: true 
        },
        categories: { 
            type: [String]  
        },
        size: { 
            type: [String]  
        },
        color: { 
            type: [String] 
        },
        price: { 
            type: Number,
            required: true 
        },
        inventory:{
            type:Number,
            required: true,
            default:1
        },
        inStock:{
            type:Boolean,
            default:true
        }
    },
    { timestamps: true }
);

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
