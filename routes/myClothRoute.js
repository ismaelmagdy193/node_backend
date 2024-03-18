const express = require('express');

const {
    createMyCloth,
    getMyCloth,
    getMyClothes,
    deleteMyCloth,
    setUserIdtoBody,
    createFilterObj
} = require('../services/myClothService');


const {
    createMyClothValidator,
    getMyClothValidator,

    deleteMyClothValidator
} = require('../utils/vaildators/myClothVaildator');


//mergeparams allow us to access parameters on the other routers
const router = express.Router({ mergeParams: true });

router.route('/')
    .post(setUserIdtoBody, createMyClothValidator, createMyCloth)
    .get(createFilterObj, getMyClothes);

router.route('/:id')
    .get(getMyClothValidator, getMyCloth)

    .delete(deleteMyClothValidator, deleteMyCloth);
module.exports = router;