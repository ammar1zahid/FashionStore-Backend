import Joi from 'joi';

// Validation schema for adding an address
export const addAddressValidator = Joi.object({
    street: Joi.string().required().messages({
        'string.base': 'Street should be a type of string',
        'any.required': 'Street is a required field'
    }),
    city: Joi.string().required().messages({
        'string.base': 'City should be a type of string',
        'any.required': 'City is a required field'
    }),
    state: Joi.string().required().messages({
        'string.base': 'State should be a type of string',
        'any.required': 'State is a required field'
    }),
    postalCode: Joi.string().required().messages({
        'string.base': 'Postal Code should be a type of string',
        'any.required': 'Postal Code is a required field'
    }),
    country: Joi.string().required().messages({
        'string.base': 'Country should be a type of string',
        'any.required': 'Country is a required field'
    })
});

// Validation schema for updating an address
export const editAddressValidator = Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    postalCode: Joi.string().optional(),
    country: Joi.string().optional()
});
