const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour=require(`${__dirname}/../models/tourModel`);
const Booking=require(`${__dirname}/../models/bookingModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
exports.getCheckoutSession=catchAsyncError(async (request,response,next)=>{
    // 1)Get the tour to be booked
    const tour=await Tour.findById(request.params.tourId);        
    // Create booking session
    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],        
        success_url:`${request.protocol}://${request.get('host')}/?tour=${request.params.tourId}&user=${request.user.id}&price=${tour.price}`,
        cancel_url:`${request.protocol}://${request.get('host')}/tour/${tour.slug}`,
        customer_email:request.user.email,
        client_reference_id:request.params.tourId,
        line_items:[
            {
            name:`${tour.name} Tour`,
            description:tour.summary,
            images:[`https://www.natours.dev/img/tours/${tour.imageCover}`],
            amount:tour.price*100,
            currency:'inr',
            quantity:1
            }
        ]
    });    
    //3) Create a session as response
    response.status(200).json({
        status:'success',
        session
    });
});
exports.createBookingCheckout=catchAsyncError(async (request,response,next)=>{
    //This is just temporary
    const {tour,user,price}=request.query;
    if(!tour&&!user&!price) return next();
    Booking.create({tour,user,price});
    response.redirect('/my-bookings');    
});
exports.getAllBookings=factory.getAll(Booking);
exports.getBooking=factory.getOne(Booking);
exports.createBooking=factory.createOne(Booking);
exports.updateBooking=factory.updateOne(Booking);
exports.deleteBooking=factory.deleteOne(Booking);
