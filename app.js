const express=require('express');
const morgan = require('morgan');
const app=express();
const tourRouter=require(`${__dirname}/routes/tourRoutes`);
const userRouter=require(`${__dirname}/routes/userRoutes`);
const AppError=require(`${__dirname}/utils/AppError`);
const globalErrorHandler=require(`${__dirname}/controllers/errorController`);
// 1) Middlewares
if(process.env.NODE_ENV==='development')
    app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.all('*',(request,response,next)=>{
    next(new AppError(`Can\'t find ${request.originalUrl} on this server`,404));
});
app.use(globalErrorHandler);
module.exports=app;
//Starting server   