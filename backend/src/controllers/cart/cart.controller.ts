import { Request, Response, NextFunction } from 'express';
import CartService from '../../service/cart.service';
import createError from '../../middlewares/error';

class CartController {
    public static async createCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CartService.createCart(req.body);
            res.status(200).json(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async updateCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CartService.updateCart(req.params.id, req.body);
            if (result) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'Cart not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async deleteCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CartService.deleteCart(req.params.id);
            if (result) {
                res.status(200).json({ message: 'Cart has been deleted' });
            } else {
                next(createError(404, 'Cart not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CartService.getCart(req.params.id);
            if (result) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'Cart not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async allCarts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CartService.getAllCarts();
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

export default CartController;
