const mongoose = require('mongoose');

const myClothSchema = new mongoose.Schema({
    //اول حاجة شكل الاسكيما
    name: {
        type: String,
        trim: true,
        unique: [true, "name must be unique"],
        minlength: [4, 'Too short name!!'],
        maxlength: [32, 'Too long name !!'],
    },
    top: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short top title'],
        // maxlength: [100, 'Too long top title'],
    },

    middle: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short middle title'],
        // maxlength: [100, 'Too long middle title'],
    },

    bottom: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short bottom title'],
        //  maxlength: [100, 'Too long bottom title'],
    },
    slug: {
        type: String,
        lowercase: true,

    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'the outfit must be belong to user'],

    },

},
    {// اعدادات للسكيما
        timestamps: true
    });
module.exports = mongoose.model('myCloth', myClothSchema);