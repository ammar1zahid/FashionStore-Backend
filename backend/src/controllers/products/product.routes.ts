import express from 'express';
import ProductController from './product.controller';
import { validate } from '../../middlewares/validation';
import { createProductValidator, updateProductValidator } from './product.validator';

const router = express.Router();

// Create Product route with validation
router.post('/', 
    validate(createProductValidator, 'body'),
    ProductController.createProduct
);

// Update Product route with validation
router.put('/:id', 
    validate(updateProductValidator, 'body'), 
    ProductController.updateProduct
);

// Delete Product route
router.delete('/:id', ProductController.deleteProduct);

// Get Product route
router.get('/:id', ProductController.getProduct);

// Get All Products route
router.get('/all', ProductController.getAllProducts);

// Get Recommended Products route
router.get('/recommended/:id', ProductController.getRecommendedProducts);

// Get Product Inventory route
router.get('/inventory/:pID', ProductController.getProductInventory);

// Get All Inventories route
router.get('/inventories', ProductController.getAllInventories);

export default router;
