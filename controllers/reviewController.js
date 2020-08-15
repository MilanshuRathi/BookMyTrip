const Review=require(`${__dirname}/../models/reviewModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
//Methods
exports.setTourandUser=(request,response,next)=>{
    if(!request.body.tour) request.body.tour=request.params.tourId;
    if(!request.body.user) request.body.user=request.user.id;
    next();
}
exports.getAllReviews=factory.getAll(Review);
exports.getReviewById=factory.getOne(Review);
exports.createReview=factory.createOne(Review);
exports.updateReview=factory.updateOne(Review);
exports.deleteReview=factory.deleteOne(Review);