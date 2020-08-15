const express=require('express');
const router=express.Router({mergeParams:true});//here merge params merges all the parameters like tourId,id of the parent routes too in this route i.e we have access to all params 
const reviewController=require(`${__dirname}/../controllers/reviewController`);
const authController=require(`${__dirname}/../controllers/authController`);
//Route handlers
//POST /:tourId/reviews , /reviews
//GET /:tourId/reviews , /reviews
//Need authentication for all routes 
router.use(authController.protect);

router.route('/')
.get(reviewController.getAllReviews)
.post(authController.restrictTo('user'),reviewController.setTourandUser,reviewController.createReview);
router.route('/:id')
.get(reviewController.getReviewById)
.patch(authController.restrictTo('user','admin'),reviewController.updateReview)
.delete(authController.restrictTo('user','admin'),reviewController.deleteReview);
module.exports=router;