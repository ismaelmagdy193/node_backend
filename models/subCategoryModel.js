const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    //اول حاجة شكل الاسكيما
    name: {
        type: String,
        trim: true,
        unique: [true, 'Subcategory should be unique'],
        minlength: [2, 'Too short name!!'],
        maxlength: [32, 'Too long name !!'],
    },
    /*title: {
         type: String,
         required: true,
         trim: true,
         minlength: [3, 'Too short product title'],
         maxlength: [100, 'Too long product title'],
     },*/
    slug: {
        type: String,
        lowercase: true,

    },

    colors: [String],

    imageCover: {
        type: String,
        required: [true, 'SubCategory image cover required'],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'SubCategory must be belong to parent category'],
    },

},

    {// اعدادات للسكيما
        timestamps: true
    });
module.exports = mongoose.model('Subcategory', subCategorySchema);