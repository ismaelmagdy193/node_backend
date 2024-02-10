/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable node/no-missing-require */

const slugify = require('slugify')
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Brand = require('../models/brandModel');
const factory = require('./handlersFactory');

//@desc    Create brand
//@route   Post  /api/v1/brands
//@access  Private

exports.createBrand = asyncHandler(async (req, res) => {

    const { name } = req.body;
    const brand = await Brand.create({ name, slug: slugify(name) });
    res.status(201).json({ data: brand });

});

//@desc    get list of Brands
//@route   GET  /api/v1/Brands
//@access  Public

exports.getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 1;
    const skip = (page - 1) * limit;

    const brands = await Brand.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: brands.length, page, data: brands });
});

//@desc    Get specfifc brand by id
//@route   GET  /api/v1/brand/:id
//@access  Public
exports.getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {

        return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(200).json({ data: brand });

});


//@desc    Update specfifc brand by id
//@route   PUT  /api/v1/brands/:id
//@access  Private 
exports.updateBrand = factory.updateOne(Brand);

//@desc    delete brand
//@route   DELETE  /api/v1/brands
//@access  Private

exports.deleteBrand = factory.deleteOne(Brand);
