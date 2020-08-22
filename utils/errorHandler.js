const mongoose = require("mongoose");
const AppError = require(`${__dirname}/AppError`);
const sendDevErr = (error,request, response) => {
    // console.log(error);
    //API ERRPR
    if(request.originalUrl.startsWith('/api'))
        response.status(error.statusCode).json({
            status: error.status,
            error,
            message: error.message,
            stack: error.stack
        });
    //WEBSITE ERROR
    else
        response.status(error.statusCode).render('error',{
            title:'Something went wrong!',
            message:error.message
        });
};
const handleCastErrorDB = (error) => {
    message = `Invalid ${error.path}: ${error.value}`;
    return new AppError(message, 400);
}
const handleValidationErrorDB = (error) => {
    const errorString = Object.values(error.errors).map(el => el.message).join(',');
    // console.log(e);
    message = `Invalid input data: ${errorString}`;
    return new AppError(message, 400);
}
const handleMongoErrorDB = (error) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];//this value is the duplicate value which was the error     
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}
const sendProdErr = (error,request, response) => {
    //A) API Error
    if(request.originalUrl.startsWith('/api')){
        if (error.isOperational)
            response.status(error.statusCode).json({
                status: error.status,
                message: error.message
            });
        else {
            console.log('Programming error occured');
            response.status(500).json({
                status: 'error',
                message: 'Something went wrong'
            });
        }
    }
    //WEBSITE ERROR
    else{
        if (error.isOperational)
            response.status(error.statusCode).render('error',{
                title:'Something went wrong!',
                message:error.message
            });
        else {
            console.log('Programming error occured');
            response.status(error.statusCode).render('error',{
                title:'Something went wrong!',
                message:'Please try again later'
            });
        }        
    }
    
};
module.exports = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'development')
        sendDevErr(error,request, response);
    else {
        // let errorTemp={...error};        
        if (error instanceof mongoose.Error.CastError) error = handleCastErrorDB(error);
        else if (error instanceof mongoose.Error.ValidationError) error = handleValidationErrorDB(error);
        else if (error.code === 11000) error = handleMongoErrorDB(error);
        else if (error.name === 'JsonWebTokenError') error = new AppError('Invalid token. Please log in again!', 401);
        else if (error.name === 'TokenExpiredError') error = new AppError('Your token has expired! Please log in again.', 401);
        sendProdErr(error,request, response);
    }
    next();
}