const mongoose = require("mongoose");
const AppError = require(`${__dirname}/AppError`);
const sendDevErr = (error, response) => {
    // console.log(error instanceof mongoose.Error.MongoError);
    response.status(error.statusCode).json({
        status: error.status,
        error,
        message: error.message,
        stack: error.stack
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
const sendProdErr = (error, response) => {
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
};
module.exports = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'development')
        sendDevErr(error, response);
    else {
        // let errorTemp={...error};        
        if (error instanceof mongoose.Error.CastError) error = handleCastErrorDB(error);
        else if (error instanceof mongoose.Error.ValidationError) error = handleValidationErrorDB(error);
        else if (error.code === 11000) error = handleMongoErrorDB(error);
        sendProdErr(error, response);
    }
    next();
}