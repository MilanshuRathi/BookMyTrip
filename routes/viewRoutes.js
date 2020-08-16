const express=require('express');
const router=express.Router();
const viewController=require(`${__dirname}/../controllers/viewController`);
const authController=require(`${__dirname}/../controllers/authController`);
router.use(authController.isLoggedin);//to check if user is logged in or not and it will run for each and every request
router.get('/',viewController.getOverview);
router.get('/tour/:tourSlug',viewController.getTour);
router.get('/login',viewController.getLoginPage);
module.exports=router;