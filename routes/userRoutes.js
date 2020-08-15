const express=require('express');
const router=express.Router();
const userController=require(`${__dirname}/../controllers/userController`);
const authController=require(`${__dirname}/../controllers/authController`);
//routes according to events 
router.post('/signUp',authController.signUp);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);
router.patch('/updatePassword',authController.protect,authController.updatePassword);
router.patch('/updateMe',authController.protect,userController.updateMe);
router.delete('/deleteMe',authController.protect,userController.deleteMe);
//general route
router.route('/')
.get(userController.getAllUsers);

//Handles get,patch,delete request for specific user
router.route('/:id')
.get(userController.getUserById)
.patch(authController.protect,authController.restrictTo('admin'),userController.updateUserById)
.delete(authController.protect,authController.restrictTo('admin'),userController.deleteUserById);

module.exports=router;