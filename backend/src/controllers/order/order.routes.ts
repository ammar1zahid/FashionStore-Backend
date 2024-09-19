import express from 'express';
import OrderController from './order.controller';
import { validate } from '../../middlewares/validation'; 
import { createOrderValidator, updateOrderValidator } from './order.validator'; 
import {  verifyAdmin } from '../../middlewares/verifyToken';

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

// Get User Orders 
router.get('/:id', OrderController.getUserOrders);

// Get All Orders 
router.get('/all/users',verifyAdmin, OrderController.getAllOrders);

// Get Monthly Income route
router.get('/all/income', OrderController.getMonthlyIncome);

export default router;
