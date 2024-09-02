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

    public static async getMonthlyIncome(): Promise<unknown[]> {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        return Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ]);
    }
}

export default OrderService;
