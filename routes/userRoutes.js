const express=require('express');
const router=express.Router();
const userController=require(`${__dirname}/../controllers/userController`);
const authController=require(`${__dirname}/../controllers/authController`);
//different route for signUp ...doesn't satisfy REST arch 100%
router.post('/signUp',authController.signUp);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);
router.patch('/updatePassword',authController.protect,authController.updatePassword);
router.route('/')
.get(userController.getAllUsers);

//Handles get,patch,delete request for specific user
router.route('/:id')
.get(userController.getUserById)
.patch(userController.updateUserById)
.delete(userController.deleteUserById);

module.exports=router;