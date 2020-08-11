const express=require('express');
const router=express.Router();
const routeController=require(`${__dirname}/../controllers/reviewController`);
const authController=require(`${__dirname}/../controllers/authController`);
router.route('/').get(routeController.getAllReviews).post(authController.protect,authController.restrictTo('user'),routeController.createReview);
module.exports=router;