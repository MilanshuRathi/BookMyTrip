const express=require('express');
const router=express.Router();
const viewController=require(`${__dirname}/../controllers/viewController`);
const bookingController=require(`${__dirname}/../controllers/bookingController`);
const authController=require(`${__dirname}/../controllers/authController`);
// authController.isLoggedin  =>  to check if user is logged in or not and it will run for each and every request
router.use(viewController.alerts);
router.get('/me',authController.protect,viewController.getAccount);
router.get('/my-bookings',authController.protect,viewController.getBookings);
router.get('/my-reviews',authController.protect,viewController.getReviews);
router.get('/',authController.isLoggedin,viewController.getOverview);
router.use(authController.isLoggedin);
router.get('/tour/:tourSlug',viewController.getTour,viewController.checkBooked);
router.get('/login',viewController.getLoginPage);
router.get('/signup',viewController.getSignUpPage);
router.get('/forgotPassword',viewController.getForgotPassword);
router.get('/resetPassword/:token',viewController.getResetPassword);
// /api/v1/users
module.exports=router;