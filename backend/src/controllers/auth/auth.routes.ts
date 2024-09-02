import { Router } from 'express';
import AuthController from './auth.controller';
import { validate } from '../../middlewares/validation'; 
import { registerUserValidator, loginUserValidator } from './auth.validator'; 

const router = Router();

// Register route with validation
router.post('/register', 
    validate(registerUserValidator, 'body'), 
    AuthController.createUser
);

// Login route with validation
router.post('/login', 
    validate(loginUserValidator, 'body'), 
    AuthController.loginUser
);

export default router;
