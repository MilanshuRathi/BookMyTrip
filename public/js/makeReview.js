import axios from 'axios'
import {showAlert} from './alerts'
export const submitReview=async (tourId,review,rating)=>{
    try{
        const response=await axios({
            method:'POST',
            url:`/api/v1/tours/${tourId}/reviews`,
            data:{
                review,
                rating
            }
        });
        if(response.data.status==='success')
            showAlert('success','Review Submitted');
    }
    catch(err){                
        showAlert('error','Error in submitting review');
    }
}