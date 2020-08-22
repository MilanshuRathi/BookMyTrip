import axios from 'axios'
import {showAlert} from './alerts'
export const submitReview=async (tourId,review,rating)=>{
    try{
        const response=await axios({
            method:'POST',
            url:`${window.location.protocol}//${window.location.host}/api/v1/tours/${tourId}/reviews`,
            data:{
                review,
                rating
            }
        });
        if(response.data.status==='success')
            showAlert('success','Review Submitted');
    }
    catch(err){        
        console.log(err.response.data.message);
        showAlert('error','Error in submitting review');
    }
}