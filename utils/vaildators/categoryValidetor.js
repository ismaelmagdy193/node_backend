const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/vaildatorMiddleware');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage("invalid category id"),
    validatorMiddleware,
];


exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('name required !!').isLength({ min: 3 }).withMessage('Too short name !!')
        .isLength({ max: 32 }).withMessage('Too long name !!')
    , validatorMiddleware,

];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage("invalid category id"),
    validatorMiddleware,
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage("invalid category id"),
    validatorMiddleware,
];