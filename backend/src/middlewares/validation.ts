import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type Schema = Joi.ObjectSchema<unknown>;

export const validate = (schema: Schema, property: 'body' | 'query' | 'params') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({
                status: 'fail',
                message: 'Validation error',
                errors: errorMessages
            });
        }
        next();
    };
};
