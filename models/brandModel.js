const mongoose = require('mongoose');


//1-Create Schema
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand required.'],
        unique: [true, 'Brand already used.'],
        minlength: [3, 'Brand too short .'],
        maxlength: [30, 'Brand too long.'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,


},
    { timestamps: true }
);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('Brand', brandSchema);

