import Joi from 'joi';

// Validation schema for creating an order
export const createOrderValidator = Joi.object({
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
            }),
            price: Joi.number().min(1).default(1).messages({
                'number.base': 'price should be a type of number',
                'number.min': 'price cannot be less than 1'
            })
        })
    ).required().messages({
        'array.base': 'Products should be an array',
        'any.required': 'Products is a required field'
    }),
    amount: Joi.number().required().messages({
        'number.base': 'Amount should be a type of number',
        'any.required': 'Amount is a required field'
    }),
    address: Joi.string().required().messages({
        'string.base': 'Address should be a type of string',
        'any.required': 'Address is a required field'
    }),
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').optional()
});

// Validation schema for updating an order
export const updateOrderValidator = Joi.object({
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
    ),
    amount: Joi.number(),
    address: Joi.string(),
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled')
});
