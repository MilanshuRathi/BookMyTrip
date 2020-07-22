const express=require('express');
const router=express.Router();
const userController=require(`${__dirname}/../controller/userController`);

router.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

//Handles get,patch,delete request for specific user
router.route('/:id')
.get(userController.getUserById)
.patch(userController.updateUserById)
.delete(userController.deleteUserById);

module.exports=router;