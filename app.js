const path=require('path');
const express = require('express');
const pug=require('pug');
const morgan = require('morgan');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const compression=require('compression');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);
const reviewRouter = require(`${__dirname}/routes/reviewRoutes`);
const viewRouter=require(`${__dirname}/routes/viewRoutes`);
const bookingRouter=require(`${__dirname}/routes/bookingRoutes`);
const AppError = require(`${__dirname}/utils/AppError`);
const globalErrorHandler = require(`${__dirname}/utils/errorHandler`);

//Start the app
const app = express();
//Trust proxies to get x-forwarder-proto check if protocol is http or https (only for sites using proxy such as heroku)
app.enable('trust proxy');

//Setting up view engine
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
// 1) Global Middlewares
app.use(express.static(path.join(__dirname,'public')));

app.use(cors());//Allowing every other domain to send requests to this domain
//Allow Access-Control-Allow-Origin
//it can be used when api is hosted on different domain and frontend application is on different domain e.g api.natours.com as api and natours-exolore.com as frontend
//we can also restrict the domain names to allow them to send requests using origin option in cors
// Example app.use(cors({origin:'https://www.natours.com'})) 

//Options is a preflight request done by browsers whenever someone makes a cors request(other than GET,POST e.g PUT,PATCH,DELETE)
//the browser checks if the server is ready for such requests or not...by making a preflight request ..before the real request 
app.options('*',cors());
//We can also restrict options request for some routes by app.options('/api/v1',cors());
//Set security headers
app.use(helmet());
app.use(compression());
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
app.use(cookieParser());//to parse cookies
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
app.use('/',viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/bookings',bookingRouter); 
app.all('*', (request, response, next) => {
    next(new AppError(`Can\'t find ${request.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
//Starting server