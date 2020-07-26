const express=require('express');
const router=express.Router();
const tourController=require(`${__dirname}/../controllers/tourController`);
// router.param('id',tourController.checkId);
router.route('/top-5-tours').get(tourController.top5ToursAliasFunc,tourController.getAllTours);
router.route('/tour-stats/:year').get(tourController.getTourStats);
router.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour);

//Handles get,patch,delete request specific to id
router.route('/:id')
.get(tourController.getTourById)
.patch(tourController.updateTourById)
.delete(tourController.deleteTourById);

module.exports=router;