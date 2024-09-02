import { Request, Response, NextFunction } from 'express';
import OrderService from '../../service/order.service';
import createError from '../../middlewares/error';

class OrderController {
    public static async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await OrderService.createOrder(req.body);
            res.status(200).json(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await OrderService.updateOrder(req.params.id, req.body);
            if (result) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'Order not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await OrderService.deleteOrder(req.params.id);
            if (result) {
                res.status(200).json({ message: 'Order has been deleted' });
            } else {
                next(createError(404, 'Order not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getUserOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await OrderService.getUserOrders(req.params.id);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'No orders found for this user'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await OrderService.getAllOrders();
            res.status(200).json(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getMonthlyIncome(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await OrderService.getMonthlyIncome();
            res.status(200).json(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }
}

export default OrderController;
