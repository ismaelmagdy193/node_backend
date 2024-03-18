// database.js
require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //  useCreateIndex: false,
            // useFindAndModify: false
        });
        console.log(`Database Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { dbConnection }; // Exporting as named export
