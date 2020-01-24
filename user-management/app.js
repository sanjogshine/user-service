const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const app = express();

const responseDispatcher = require('./utils/responseDispatcher');

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());


// Routes
app.use('/user', userRoutes);

// handle undefined Routes
app.use('*', (err, req, res, next) => {

    if (err) {
        return responseDispatcher.dispatchResponse(res, 400, AppError.MISSING_OR_INVALID_REQUEST_PARAMETER());
    }
    next();
});


module.exports = app;