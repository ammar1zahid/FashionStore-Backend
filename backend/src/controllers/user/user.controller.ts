import { Request, Response, NextFunction } from 'express';
import UserService from '../../service/user.service';
import createError from '../../middlewares/error';

class UserController {
    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedUser = await UserService.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                next(createError(404, 'User not found'));
                return;
            }
            res.status(200).json(updatedUser);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedUser = await UserService.deleteUser(req.params.id);
            if (!deletedUser) {
                next(createError(404, 'User not found'));
                return;
            }
            res.status(200).json('User has been deleted');
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await UserService.getUser(req.params.id);
            if (!user) {
                next(createError(404, 'User not found'));
                return;
            }
            res.status(200).json(user);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const allUsers = await UserService.getAllUsers();
            res.status(200).json(allUsers);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getUserStats(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const stats = await UserService.getUserStats();
            res.status(200).json(stats);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async forgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const message = await UserService.forgetPassword(req.body.email);
            res.status(200).json(message);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const message = await UserService.resetPassword(
                req.params.id,
                req.params.token,
                req.body.password,
                req.body.confirmPassword
            );
            res.status(200).json(message);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async addPaymentMethod(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const paymentMethods = await UserService.addPaymentMethod(req.params.id, req.body);
            res.status(200).json(paymentMethods);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async editPaymentMethod(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const paymentMethod = await UserService.editPaymentMethod(
                req.params.id,
                req.params.paymentMethodId,
                req.body
            );
            if (!paymentMethod) {
                next(createError(404, 'Payment method not found'));
                return;
            }
            res.status(200).json(paymentMethod);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async deletePaymentMethod(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const paymentMethods = await UserService.deletePaymentMethod(req.params.id, req.params.paymentMethodId);
            res.status(200).json(paymentMethods);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getPaymentMethods(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const paymentMethods = await UserService.getPaymentMethods(req.params.id);
            res.status(200).json(paymentMethods);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }
}

export default UserController;
