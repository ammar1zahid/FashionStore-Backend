import { Request, Response, NextFunction } from 'express';
import AuthService from '../../service/auth.service';
import createError from '../../middlewares/error';

class AuthController {
    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await AuthService.createUser(req.body);
            res.status(200).send("User has been created");
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password } = req.body;
            const result = await AuthService.loginUser(username, password);

            if (!result) {
                return next(createError(400, "Wrong username or password"));
            }

            const { token, user } = result;

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }
}

export default AuthController;
