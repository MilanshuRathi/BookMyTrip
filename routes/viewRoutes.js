const express=require('express');
const router=express.Router();
const viewController=require(`${__dirname}/../controllers/viewController`);
const authController=require(`${__dirname}/../controllers/authController`);
// authController.isLoggedin  =>  to check if user is logged in or not and it will run for each and every request
router.get('/',authController.isLoggedin,viewController.getOverview);
router.get('/tour/:tourSlug',authController.isLoggedin,viewController.getTour);
router.get('/login',authController.isLoggedin,viewController.getLoginPage);
router.get('/signup',authController.isLoggedin,viewController.getSignUpPage);
router.get('/me',authController.protect,viewController.getAccount);
module.exports=router;