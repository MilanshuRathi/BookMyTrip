const express=require('express');
const router=express.Router({mergeParams:true});
const bookingController=require(`${__dirname}/../controllers/bookingController`);
const authController=require(`${__dirname}/../controllers/authController`);
/*this will not follow rest api principle bcoz it's not for crud operations 
instead is for client to get a checkout session*/
router.use(authController.protect);
router.get('/checkout-session/:tourId',bookingController.getCheckoutSession);
router.use(authController.restrictTo('admin','lead-guide'));
router.route('/')
.get(bookingController.getAllBookings)
.post(bookingController.createBooking);
router.route('/:id')
.get(bookingController.getBooking)
.patch(bookingController.updateBooking)
.delete(bookingController.deleteBooking);
module.exports=router;