const mongoose= require("mongoose");
const { response } = require("../app");
const AppError=require(`${__dirname}/AppError`);
const sendDevErr=(error,response)=>{    
    // console.log(error instanceof mongoose.Error.MongoError);
    response.status(error.statusCode).json({
        status:error.status,
        error,
        message:error.message,
        stack:error.stack
    });
};
const handleCastErrorDB=(error,response)=>{    
    message=`Invalid ${error.path}: ${error.value}`;
    sendProdErr(new AppError(message,400),response);
}
const handleValidationErrorDB=(error,response)=>{
    const errorString=Object.values(error.errors).map(el=>el.message).join(',');
    // console.log(e);
    message=`Invalid input data: ${errorString}`;
    sendProdErr(new AppError(message,400),response);
}
const handleMongoErrorDB=(error,response)=>{
    message=`Duplicate value of '${Object.keys(error.keyPattern)[0]}' is not allowed`;
    sendProdErr(new AppError(message,400),response);
}
const sendProdErr=(error,response)=>{
    if(error.isOperational)
        response.status(error.statusCode).json({
            status:error.status,
            message:error.message
        });
    else{
        console.log('Programming error occured');
        response.status(500).json({
            status:'error',
            message:'Something went wrong'
        });
    }        
};
module.exports=(error,request,response,next)=>{      
    error.statusCode=error.statusCode||500;
    error.status=error.status||'error';
    if(process.env.NODE_ENV==='development')
        sendDevErr(error,response);
    else{
        // let errorTemp={...error};        
        if(error instanceof mongoose.Error.CastError)
            handleCastErrorDB(error,response);                            
        else if(error instanceof mongoose.Error.ValidationError)
            handleValidationErrorDB(error,response);                 
        else if(error.code===11000)
            handleMongoErrorDB(error,response);   
    }        
    next();
}