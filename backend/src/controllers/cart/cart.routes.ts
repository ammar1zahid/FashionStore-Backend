import express from 'express';
import CartController from './cart.controller';
import { validate } from '../../middlewares/validation'; 
import { createCartValidator, updateCartValidator } from './cart.validator'; 

const router = express.Router();

// Create Cart route with validation
router.post('/', 
    validate(createCartValidator, 'body'), 
    CartController.createCart
);

// Update Cart route with validation
router.put('/:id', 
    validate(updateCartValidator, 'body'), 
    CartController.updateCart
);

// Delete Cart route
router.delete('/:id', CartController.deleteCart);

// Get Cart route
router.get('/:id', CartController.getCart);

// Get all Carts route
router.get('/all', CartController.allCarts);

export default router;
