const Review=require(`${__dirname}/../models/reviewModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
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
exports.setTourandUser=(request,response,next)=>{
    if(!request.body.tour) request.body.tour=request.params.tourId;
    if(!request.body.user) request.body.user=request.user.id;
    next();
}
exports.createReview=factory.createOne(Review);
exports.updateReview=factory.updateOne(Review);
exports.deleteReview=factory.deleteOne(Review);