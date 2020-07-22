const express=require('express');
const morgan = require('morgan');
const app=express();
const tourRouter=require(`${__dirname}/routes/tourRoutes`);
const userRouter=require(`${__dirname}/routes/userRoutes`);

// 1) Middlewares
if(process.env.NODE_ENV==='development')
    app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports=app;
//Starting server   