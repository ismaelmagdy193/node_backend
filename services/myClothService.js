const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const MyCloth = require('../models/myClothModel');
const ApiError = require('../utils/apiError');

exports.setUserIdtoBody = (req, res, next) => {
    if (!req.body.user) req.body.user = req.params.userId;
    next();
};

exports.createMyCloth = asyncHandler(async (req, res, next) => {
    try {
        if (!req.body.name) {
            return next(new ApiError('Name is required for cloth creation', 400));
        }

        // Generate slug using name field
        req.body.slug = slugify(req.body.name, { lower: true });

        // Create the cloth item
        const myCloth = await MyCloth.create(req.body);

        res.status(200).json({ data: myCloth });
    } catch (error) {
        next(error); // Forward error to the error handling middleware
    }
});


exports.createFilterObj = (req, res, next) => {

    let filterObject = {};
    if (req.params.userId) filterObject = { user: req.params.userId };
    req.filterObject = filterObject;
    next();
}


// get/api/user/:userId/myClothes
exports.getMyClothes = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;


    const myCloth = await MyCloth.find(req.filterObj)
        .skip(skip)
        .limit(limit)
        .populate({ path: 'user', select: 'name-_id' });
    res.status(200).json({ results: myCloth.length, page, data: myCloth });
});

//@desc    Get specfifc myCloth by id
//@route   GET  /api/v1/favorites/:id
//@access  Public
exports.getMyCloth = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const myCloth = await MyCloth.findById(id);
    if (!myCloth) {

        return next(new ApiError(`No outfit for this id ${id}`, 404));
    }
    res.status(200).json({ data: myCloth });

});


//@desc    delete favorite
//@route   DELETE  /api/v1/favorites 
//@access  Private
exports.deleteMyCloth = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await MyCloth.findByIdAndDelete(id);

    if (!document) {
        return next(new ApiError(`No document for this id ${id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'document has been deleted successfully.',
    });
});