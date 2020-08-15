const express=require('express');
const router=express.Router();
const tourController=require(`${__dirname}/../controllers/tourController`);
const authController=require(`${__dirname}/../controllers/authController`);
const reviewRouter=require(`${__dirname}/../routes/reviewRoutes`);
router.route('/top-5-tours').get(tourController.top5ToursAliasFunc,tourController.getAllTours);
router.route('/tour-stats/:year').get(tourController.getTourStats);
router.route('/')
.get(authController.protect,tourController.getAllTours)
.post(tourController.createTour);

router.use('/:tourId/reviews',reviewRouter);
//Handles get,patch,delete request specific to id
router.route('/:id')
.get(tourController.getTourById)
.patch(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.updateTourById)
.delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTourById);

module.exports=router;