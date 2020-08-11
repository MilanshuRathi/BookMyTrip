const Review=require(`${__dirname}/../models/reviewModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError=require(`${__dirname}/../utils/AppError`);
// const catchAsyncError=require(`${__dirname}/../utils/API`);

//Methods
exports.getAllReviews=catchAsyncError(async (request,response,next)=>{
    const reviews=await Review.find();//add request.query    
    response.status(200).json({
        status:'success',
        results:reviews.length,
        data:{
            reviews
        }
    });
});
exports.createReview=catchAsyncError(async (request,response,next)=>{
    const newReview=await Review.create({
        review:request.body.review,
        rating:request.body.rating,
        createdAt:request.body.createdAt,
        tour:request.body.tour,
        user:request.body.user
    });
    response.status(201).json({
        status:'success',
        data:{
            review:newReview
        }
    }); 
});