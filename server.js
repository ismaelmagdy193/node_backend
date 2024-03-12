const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const subCategoryRoute = require('./routes/subCategoryRout');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

dotenv.config({ path: 'config.env' });
dbConnection();

const app = express();

// Enable CORS
app.use(cors());

//compress all responses
app.use(compression());

app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode;${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/vi/categories', categoryRoute);
app.use('/api/vi/subcategories', subCategoryRoute);
app.use('/api/vi/users', userRoute);
app.use('/api/vi/auth', authRoute);

// Route not found error handler
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App running running on port ${PORT}`);
});