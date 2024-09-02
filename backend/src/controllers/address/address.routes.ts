import express from 'express';
import AddressController from './address.controller';
import { validate } from '../../middlewares/validation';
import { addAddressValidator, editAddressValidator } from './address.validator';

const router = express.Router();

// Add Address route with validation
router.post('/:id', 
    validate(addAddressValidator, 'body'), 
    AddressController.addAddress
);

// Get Addresses route
router.get('/:id', AddressController.getAddresses);

// Get Address by ID route
router.get('/:id/:addressId', AddressController.getAddressById);

// Edit Address route with validation
router.put('/:id/:addressId', 
    validate(editAddressValidator, 'body'), 
    AddressController.editAddress
);

// Delete Address route
router.delete('/:id/:addressId', AddressController.deleteAddress);

export default router;
