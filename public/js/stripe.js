import axios from 'axios'
import { showAlert } from './alerts';
let stripe;
try{
    stripe=Stripe('pk_test_51HHwCbLDl0QoYbuidVIeE6UVbVyHNKtzEgKve1Y6Mr3x0RFCX8KBh3wRTbBP2Q0GIEoJcoFc7vGkYecyumwiWWGa00kHjV61t5');
}
catch(err){
    console.log(err.message);
}
export const bookTour= async tourId=>{    
    //1)Get session from the server
    try{
        const session=await axios.get(`${window.location.protocol}//${window.location.host}/api/v1/bookings/checkout-session/${tourId}`);        
        stripe.redirectToCheckout({
            sessionId:session.data.session.id
        });   
    } 
    catch(err){
        showAlert('error','Payment Failed,please try again later');
        document.getElementById('bookingButton').textContent="Book tour now!";
    }   
};