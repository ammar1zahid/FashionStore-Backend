import mongoose from 'mongoose';
import Order, { IOrder } from '../models/order.model';
 

class OrderService {
    public static async createOrder(orderData: IOrder): Promise<IOrder> {
        const newOrder = new Order(orderData);
        return newOrder.save();
    }

    public static async updateOrder(orderId: string, orderData: Partial<IOrder>): Promise<IOrder | null> {
        return Order.findByIdAndUpdate(orderId, { $set: orderData }, { new: true }).exec();
    }

    public static async deleteOrder(orderId: string): Promise<IOrder | null> {
        return Order.findByIdAndDelete(orderId).exec();
    }

    public static async getUserOrders(userId: string): Promise<IOrder[]> {
        return Order.find({ userId })
            .populate('address', 'street city state postalCode country')
            .populate('products.productId', 'title desc img categories size color price')
            .exec();
    }

    public static async getAllOrders(): Promise<IOrder[]> {
        return Order.find()
            .populate('address', 'street city state postalCode country')
            .populate('products.productId', 'title desc img categories size color price')
            .exec();
    }

   

    

    public static async getMonthlyIncome(productId?: string): Promise<unknown[]> {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    
        // Base match condition for orders in the last two months
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const matchCondition: any = {
            createdAt: { $gte: previousMonth }
        };
    
        // If productId is provided, add a filter for the specific productId
        if (productId) {
            matchCondition["products.productId"] = new mongoose.Types.ObjectId(productId);
        }
    
     
    
        // MongoDB aggregation pipeline
        return Order.aggregate([
            { $match: matchCondition }, // Filter orders based on date and (optionally) productId
            { $unwind: "$products" }, // Unwind the products array
            // Only match the specific productId if it exists
            ...(productId ? [
                {
                    $match: {
                        "products.productId": new mongoose.Types.ObjectId(productId)
                    }
                }
            ] : []), // If no productId, skip this step
            {
                $project: {
                    month: { $month: "$createdAt" }, // Extract the month
                    sales: { $multiply: ["$products.quantity", "$products.price"] } // Calculate sales using price and quantity
                }
            },
            {
                $group: {
                    _id: "$month", // Group by month
                    total: { $sum: "$sales" } // Sum the total sales
                }
            },
            { $sort: { _id: 1 } } // Sort by month
        ]);
    }
    
    
    
    
    
    
    
    
    
    
}

export default OrderService;
