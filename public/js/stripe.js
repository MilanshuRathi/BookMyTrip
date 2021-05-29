import axios from 'axios'
import { showAlert } from './alerts';
let stripe;
try{
    stripe=Stripe(process.env.STRIPE_PUBLIC_KEY);
}
catch(err){
    console.log(err.message);
}
export const bookTour= async tourId=>{    
    //1)Get session from the server
    try{
        const session=await axios.get(`/api/v1/bookings/checkout-session/${tourId}`);        
        stripe.redirectToCheckout({
            sessionId:session.data.session.id
        });   
    } 
    catch(err){
        console.log(err);
        showAlert('error','Payment Failed,please try again later');
        document.getElementById('bookingButton').textContent="Book tour now!";
    }   
};