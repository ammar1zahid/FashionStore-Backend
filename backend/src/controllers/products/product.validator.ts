import Joi from 'joi';

// Validation schema for creating a product
export const createProductValidator = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'Title should be a type of string',
        'any.required': 'Title is a required field'
    }),
    desc: Joi.string().required().messages({
        'string.base': 'Description should be a type of string',
        'any.required': 'Description is a required field'
    }),
    img: Joi.string().required().messages({
        'string.base': 'Image URL should be a type of string',
        'any.required': 'Image URL is a required field'
    }),
    categories: Joi.array().items(Joi.string()).optional(),
    size: Joi.array().items(Joi.string()).optional(),
    color: Joi.array().items(Joi.string()).optional(),
    price: Joi.number().required().messages({
        'number.base': 'Price should be a type of number',
        'any.required': 'Price is a required field'
    }),
    inventory: Joi.number().required().min(1).messages({
        'number.base': 'Inventory should be a type of number',
        'number.min': 'Inventory cannot be less than 1',
        'any.required': 'Inventory is a required field'
    }),
    inStock: Joi.boolean().optional().messages({
        'boolean.base': 'InStock should be a type of boolean'
    })
});

// Validation schema for updating a product
export const updateProductValidator = Joi.object({
    title: Joi.string().optional(),
    desc: Joi.string().optional(),
    img: Joi.string().optional(),
    categories: Joi.array().items(Joi.string()).optional(),
    size: Joi.array().items(Joi.string()).optional(),
    color: Joi.array().items(Joi.string()).optional(),
    price: Joi.number().optional(),
    inventory: Joi.number().min(1).optional(),
    inStock: Joi.boolean().optional()
});
