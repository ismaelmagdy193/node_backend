const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/vaildatorMiddleware');
const CategoryModel = require('../../models/categoryModel');

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage("invalid Subcategory id"),
    validatorMiddleware,
];


// eslint-disable-next-line no-sparse-arrays
exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required !!')
        .isLength({ min: 2 })
        .withMessage('Too short name !!')
        .isLength({ max: 32 })
        .withMessage('Too long name !!'),

    check('category')
        .notEmpty()
        .withMessage('subCategoru must belong to category')
        .isMongoId()
        .withMessage('invalid category id').custom((categoryId) =>
            CategoryModel.findById(categoryId).then((category) => {
                if (!category) {
                    return Promise.reject(
                        new Error(`No category found for this ID ${categoryId}`)
                    );
                }
            })
        ),

    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage("invalid Subcategory id"),
    validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage("invalid Subcategory id"),
    validatorMiddleware,
]; 