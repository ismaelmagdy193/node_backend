/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/vaildatorMiddleware');
const User = require('../../models/userModel');



exports.loginValidator = [

    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address'),


    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
];



