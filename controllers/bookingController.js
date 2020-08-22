const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour=require(`${__dirname}/../models/tourModel`);
const User=require(`${__dirname}/../models/userModel`);
const Booking=require(`${__dirname}/../models/bookingModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
exports.getCheckoutSession=catchAsyncError(async (request,response,next)=>{
    // 1)Get the tour to be booked
    const tour=await Tour.findById(request.params.tourId);        
    // Create booking session
    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],        
        // success_url:`${request.protocol}://${request.get('host')}/my-bookings/?tour=${request.params.tourId}&user=${request.user.id}&price=${tour.price}`,
        success_url:`${request.protocol}://${request.get('host')}/my-bookings?alert=booking`,
        cancel_url:`${request.protocol}://${request.get('host')}/tour/${tour.slug}`,
        customer_email:request.user.email,
        client_reference_id:request.params.tourId,
        line_items:[
            {
            name:`${tour.name} Tour`,
            description:tour.summary,
            images:[`${request.protocol}://${request.get('host')}/img/tours/${tour.imageCover}`],
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
const createBookingCheckout=async session=>{
    const tour=session.client_reference_id;
    const user=(await User.findOne({email:session.customer_email})).id;
    const price=(session.display_items[0].amount)/100;
    await Booking.create({tour,user,price});
};
exports.webhookCheckout=(request,response,next)=>{
    const signature=request.headers['stripe-signature'];
    let event;
    try{
        event=stripe.webhooks.constructEvent(
            request.body,
            signature,
            process.env.STRIPE_WEBHOOK_KEY
        );
    }     
    catch(err){
        return response.status(400).send(`Webhook error:${err.message}`);
    }
    if(event.type==='checkout.session.completed')
        createBookingCheckout(event.data.object);
    response.status(200).json({
        recieved:true
    });
};
exports.getAllBookings=factory.getAll(Booking);
exports.getBooking=factory.getOne(Booking);
exports.createBooking=factory.createOne(Booking);
exports.updateBooking=factory.updateOne(Booking);
exports.deleteBooking=factory.deleteOne(Booking);
