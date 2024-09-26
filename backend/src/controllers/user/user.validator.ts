import Joi from 'joi';


// Validator for updating a user
export const updateUserValidator = Joi.object({
    username: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    phone: Joi.string().optional(),
    isAdmin: Joi.boolean().optional(),
    img: Joi.string().optional(),
});

// Validator for password reset
export const resetPasswordValidator = Joi.object({
    password: Joi.string().required().messages({
        'string.base': 'Password should be a type of string',
        'any.required': 'Password is a required field'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.base': 'Confirm Password should be a type of string',
        'any.required': 'Confirm Password is a required field',
        'any.only': 'Confirm Password must match Password'
    })
});

// Validator for adding or updating a payment method
export const paymentMethodValidator = Joi.object({
    cardNumber: Joi.string().pattern(/^[0-9]{16}$/).required().messages({
        'string.pattern.base': 'Card Number must be exactly 16 digits',
        'string.base': 'Card Number should be a type of string',
        'any.required': 'Card Number is a required field'
    }),
    cardName: Joi.string().required().messages({
        'string.base': 'Card Name should be a type of string',
        'any.required': 'Card Name is a required field'
    }),
    expiryDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).required().messages({
        'string.pattern.base': 'Expiry Date must be in the format MM/YY',
        'string.base': 'Expiry Date should be a type of string',
        'any.required': 'Expiry Date is a required field'
    }),
    cvv: Joi.string().pattern(/^[0-9]{3,4}$/).required().messages({
        'string.pattern.base': 'CVV must be 3 or 4 digits',
        'string.base': 'CVV should be a type of string',
        'any.required': 'CVV is a required field'
    })
});
