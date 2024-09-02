import Joi from 'joi';

// Validation schema for creating a cart
export const createCartValidator = Joi.object({
    userId: Joi.string().required().messages({
        'string.base': 'User ID should be a type of string',
        'any.required': 'User ID is a required field'
    }),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required().messages({
                'string.base': 'Product ID should be a type of string',
                'any.required': 'Product ID is a required field'
            }),
            quantity: Joi.number().min(1).default(1).messages({
                'number.base': 'Quantity should be a type of number',
                'number.min': 'Quantity cannot be less than 1'
            })
        })
    ).required().messages({
        'array.base': 'Products should be an array',
        'any.required': 'Products is a required field'
    })
});

// Validation schema for updating a cart
export const updateCartValidator = Joi.object({
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required().messages({
                'string.base': 'Product ID should be a type of string',
                'any.required': 'Product ID is a required field'
            }),
            quantity: Joi.number().min(1).default(1).messages({
                'number.base': 'Quantity should be a type of number',
                'number.min': 'Quantity cannot be less than 1'
            })
        })
    )
});
