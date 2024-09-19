import Joi from 'joi';

// Validation schema for creating or updating a wishlist entry
export const createOrUpdateWishlistValidator = Joi.object({
    productId: Joi.string().hex().length(24).required().messages({
        'string.base': 'Product ID should be a type of string',
        'string.hex': 'Product ID must be a valid hex string',
        'string.length': 'Product ID must be 24 characters long',
        'any.required': 'Product ID is a required field'
    })
});

// Validation schema for deleting a wishlist entry
export const deleteWishlistValidator = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'string.base': 'User ID should be a type of string',
        'string.hex': 'User ID must be a valid hex string',
        'string.length': 'User ID must be 24 characters long',
        'any.required': 'User ID is a required field'
    }),
    productId: Joi.string().hex().length(24).required().messages({
        'string.base': 'Product ID should be a type of string',
        'string.hex': 'Product ID must be a valid hex string',
        'string.length': 'Product ID must be 24 characters long',
        'any.required': 'Product ID is a required field'
    })
});


