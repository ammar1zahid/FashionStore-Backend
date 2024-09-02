/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from './error';

interface IUser {
    id: string;
    isAdmin: boolean;
}



// Middleware to verify token

// Middleware to verify token
export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;


    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_KEY as string, (err:any, user:any) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user as IUser; // Type assertion
        next();
    });
};




// Middleware to verify user
export const verifyUser = (req: any, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {

        if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {      

            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// Middleware to verify admin
export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};
