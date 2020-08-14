const express=require('express');
const router=express.Router({mergeParams:true});//here merge params merges all the parameters like tourId,id of the parent routes too in this route i.e we have access to all params 
const reviewController=require(`${__dirname}/../controllers/reviewController`);
const authController=require(`${__dirname}/../controllers/authController`);
//Route handlers
//POST /:tourId/reviews , /reviews
//GET /:tourId/reviews , /reviews
router.route('/')
.get(reviewController.getAllReviews)
.post(authController.protect,authController.restrictTo('user'),reviewController.createReview);
router.route('/:id')
.delete(authController.protect,authController.restrictTo('user'),reviewController.deleteReview);
module.exports=router;