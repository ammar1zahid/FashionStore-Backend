import Joi from 'joi';

// Validation schema for adding or updating a rating
export const addOrUpdateRatingValidator = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
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
    }),
    rating: Joi.number().min(1).max(5).required().messages({
        'number.base': 'Rating should be a type of number',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating can be at most 5',
        'any.required': 'Rating is a required field'
    })
});

// Validation schema for deleting a rating (only userId and productId need to be validated here)
export const deleteRatingValidator = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
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
