const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/vaildatorMiddleware');
const UserModel = require('../../models/userModel');

exports.getMyClothValidator = [
    check('id').isMongoId().withMessage("invalid Outfit id"),
    validatorMiddleware,
];


exports.createMyClothValidator = [
    check('name')
        .notEmpty().withMessage('name required !!')

        .isLength({ min: 4 }).withMessage('Too short name !!')

        .isLength({ max: 32 }).withMessage('Too long name !!'),

    check('top')
        .notEmpty().withMessage('top required !!')
        .isLength({ min: 3 }).withMessage('Too short name !!'),


    check('middle')
        .notEmpty().withMessage('name required !!')
        .isLength({ min: 3 }).withMessage('Too short name !!'),

    check('bottom')
        .notEmpty().withMessage('name required !!')
        .isLength({ min: 3 }).withMessage('Too short name !!'),


    check('user')
        .notEmpty()
        .withMessage("Outfit must be belong to user")
        .isMongoId().withMessage("invalid user id ").custom((userId) =>
            UserModel.findById(userId).then((user) => {
                if (!user) {
                    return Promise.reject(
                        new Error(`No category found for this ID ${userId}`)
                    );
                }
            })
        )

    , validatorMiddleware,

];

exports.updateMyClothValidator = [
    check('id').isMongoId().withMessage("invalid Outfit id"),
    validatorMiddleware,
];

exports.deleteMyClothValidator = [
    check('id').isMongoId().withMessage("invalid Outfit id"),
    validatorMiddleware,
];