const Review=require(`${__dirname}/../models/reviewModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
// const AppError=require(`${__dirname}/../utils/AppError`);

//Methods
exports.getAllReviews=catchAsyncError(async (request,response,next)=>{
    let filter={};
    if(request.params.tourId) filter={tour:request.params.tourId};
    const reviews=await Review.find(filter);//gets reviews of a specific tour when tourId is mentioned
    response.status(200).json({
        status:'success',
        results:reviews.length,
        data:{
            reviews
        }
    });
});
exports.createReview=catchAsyncError(async (request,response,next)=>{
    if(!request.body.tour) request.body.tour=request.params.tourId;
    if(!request.body.user) request.body.user=request.user.id;
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