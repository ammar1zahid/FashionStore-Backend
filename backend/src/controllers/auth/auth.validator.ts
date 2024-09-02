import Joi from 'joi';

// Validation schema for user registration
export const registerUserValidator = Joi.object({
    username: Joi.string().pattern(/^[a-zA-Z0-9_]+$/).required().messages({
        'string.pattern.base': 'Username can only contain letters, numbers, and underscores',
        'string.base': 'Username should be a type of string',
        'any.required': 'Username is a required field'
    }),
    firstName: Joi.string().required().messages({
        'string.base': 'First name should be a type of string',
        'any.required': 'First name is a required field'
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'Last name should be a type of string',
        'any.required': 'Last name is a required field'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is a required field'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of string',
        'string.min': 'Password should be at least 6 characters long',
        'any.required': 'Password is a required field'
    }),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
        'string.pattern.base': 'Phone number must be between 10 to 15 digits and contain only numbers',
        'string.base': 'Phone number should be a type of string'
    }),
    isAdmin: Joi.boolean().optional()
});

// Validation schema for user login
export const loginUserValidator = Joi.object({
    username: Joi.string().required().messages({
        'string.base': 'Username should be a type of string',
        'any.required': 'Username is a required field'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of string',
        'string.min': 'Password should be at least 6 characters long',
        'any.required': 'Password is a required field'
    })
});
