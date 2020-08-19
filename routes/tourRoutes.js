const express=require('express');
const router=express.Router();
const tourController=require(`${__dirname}/../controllers/tourController`);
const authController=require(`${__dirname}/../controllers/authController`);
const reviewRouter=require(`${__dirname}/../routes/reviewRoutes`);
router.route('/top-5-tours').get(tourController.top5ToursAliasFunc,tourController.getAllTours);
router.route('/tour-stats/:year').get(authController.protect,authController.restrictTo('admin','lead-guide','guide'),tourController.getTourStats);
router.route('/tours-within/:distance/center/:latlong/unit/:unit').get(tourController.getTourWithin);
router.route('/tours-within/:latlong/unit/:unit').get(tourController.getDistances);
router.route('/')
.get(tourController.getAllTours)
.post(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.createTour);

router.use('/:tourId/reviews',reviewRouter);
//Handles get,patch,delete request specific to id
router.route('/:id')
.get(tourController.getTourById)
.patch(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.uploadTourImages,tourController.resizeTourImages,tourController.updateTourById)
.delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTourById);

module.exports=router;