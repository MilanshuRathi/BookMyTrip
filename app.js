const express = require('express');
const morgan = require('morgan');
const app = express();
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');

const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);
const AppError = require(`${__dirname}/utils/AppError`);
const globalErrorHandler = require(`${__dirname}/utils/errorHandler`);
// 1) Global Middlewares
//Set security headers
app.use(helmet());
//Logging middleware
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

const limiting=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:'Too many requests,Please try again later in an hour!' 
});
//Bodyparser parser reading data from body to req.body
app.use(express.json());

//Sanitizing mongo queries if any from request
app.use(mongoSanitize());
//Sanitizing xss scripts 
app.use(xss());
//Preventing parameter pollution by using hpp 'http parameter protection'
app.use(hpp({
    whitelist:[//here whitelist is for those parameters for which we don't wanna use hpp
       'duration',
       'ratingsQuantity',
       'ratingsAverage',
       'maxGroupSize',
       'difficulty',
       'price' 
    ]
}));
//Limits no. of requests from same ip
app.use('/api',limiting);
//Routes for diff endpoints
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (request, response, next) => {
    next(new AppError(`Can\'t find ${request.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
//Starting server