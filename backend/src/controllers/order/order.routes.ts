import express from 'express';
import OrderController from './order.controller';
import { validate } from '../../middlewares/validation'; 
import { createOrderValidator, updateOrderValidator } from './order.validator'; 

const router = express.Router();

// Create Order route with validation
router.post('/', 
    validate(createOrderValidator, 'body'), 
    OrderController.createOrder
);

// Update Order route with validation
router.put('/:id', 
    validate(updateOrderValidator, 'body'),
    OrderController.updateOrder
);

// Delete Order route
router.delete('/:id', OrderController.deleteOrder);

// Get User Orders route
router.get('/:id', OrderController.getUserOrders);

// Get All Orders route
router.get('/all', OrderController.getAllOrders);

// Get Monthly Income route
router.get('/income', OrderController.getMonthlyIncome);

export default router;
