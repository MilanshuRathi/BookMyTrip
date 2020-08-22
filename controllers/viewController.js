const { request } = require("express");

const Tour=require(`${__dirname}/../models/tourModel`);
const Booking=require(`${__dirname}/../models/bookingModel`);
const Review=require(`${__dirname}/../models/reviewModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`)
const AppError=require(`${__dirname}/../utils/AppError`);
exports.alerts=(request,response,next)=>{
    const {alert}=request.query;    
    if(alert==='booking')
        response.locals.alert='Your booking was successfull!,Please check your email for confirmation\nIf your booking does\'nt show up here immediately,please come back later'
    next();
}
exports.getOverview=catchAsyncError(async(request,response,next)=>{    
    //1) get tours data from Tour model
    const tours=await Tour.find();//await Tour.find();    
    //2)Build template
    //3)Render that template from data using 1)
    response.status(200).render('overview',{
        title:'All tours',
        tours
    });
});
exports.checkBooked=catchAsyncError(async (request,response,next)=>{    
    const tour=request.tour;
    let isBooked=false;
    if(response.locals.user){
        const booking=await Booking.findOne({tour:request.tour.id,user:response.locals.user.id});
        if(booking)
            isBooked=true;        
    }    
    response.status(200).render('tour-detailed',{
        title:tour.name ,
        tour,
        isBooked       
    });
});
exports.getTour=catchAsyncError(async(request,response,next)=>{       
    //1) get tour data from Tour model
    const tour=await Tour.findOne({slug:request.params.tourSlug}).populate({
        path:'reviews',
        fields:'review rating user'
    });
    if(!tour)
        return next(new AppError('There is no tour with that name',404));
    request.tour=tour;
    next();
    //find that tour from slug    
    //2)Build template
    // response.status(200).json({
    //     tour
    // })
    //3)Render that template from data using 1)             
});
exports.getBookings=catchAsyncError(async (request,response,next)=>{    
    if(response.locals.user){
        const bookings=await Booking.find({user:request.user.id});            
        let tours=[];
        for(let i=0;i<bookings.length;i++){
            tours.push(Tour.findById(bookings[i].tour));
        }              
        tours=await Promise.all(tours);        
        response.status(200).render('overview',{title:'My Bookings',tours});        
    }        
    else    
        response.redirect('/login');
});
exports.getReviews=catchAsyncError(async (request,response,next)=>{    
    if(response.locals.user){
        const reviews=await Review.find({user:request.user.id}).populate('tour');                     
        response.status(200).render('myReviews',{title:'My Reviews',reviews});        
    }        
    else    
        response.redirect('/login');
});
exports.getLoginPage=(request,response,next)=>{
    if(!response.locals.user)
        response.status(200).render('login',{title:'Login'});
    else    
        response.redirect('/');
};
exports.getSignUpPage=(request,response,next)=>{
    if(!response.locals.user)        
        response.status(200).render('signup',{title:'Create your Account'});
    else    
        response.redirect('/');
};
exports.getAccount=(request,response)=>{
    if(response.locals.user)
        response.status(200).render('account',{title:'My account'});
    else    
        response.redirect('/login');
};
exports.getForgotPassword=(request,response)=>{
    if(!response.locals.user)
        response.status(200).render('forgotPassword',{title:'Forgot Password'});
    else    
        response.redirect('/');
};
exports.getResetPassword=(request,response)=>{
    if(!response.locals.user)
        response.status(200).render('resetPassword',{title:'Reset Password'});
    else    
        response.redirect('/');
};