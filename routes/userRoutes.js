const express=require('express');
const router=express.Router();
const userController=require(`${__dirname}/../controllers/userController`);
const authController=require(`${__dirname}/../controllers/authController`);
//routes(requests) according to events 
//No authentication required for these routes
router.post('/signUp',authController.signUp);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);

//Authentication is required for all the routes after this
router.use(authController.protect);
router.patch('/updatePassword',authController.updatePassword);
router.get('/me',userController.getMe,userController.getUserById);
router.patch('/updateMe',userController.updateMe);
router.delete('/deleteMe',userController.deleteMe);
//general route

//Authorization as an admin is required for all the routes after this
router.use(authController.restrictTo('admin'));
router.route('/')
.get(userController.getAllUsers);

//Handles get,patch,delete request for specific user
router.route('/:id')
.get(userController.getUserById)
.patch(userController.updateUserById)
.delete(userController.deleteUserById);

module.exports=router;