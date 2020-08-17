import axios from 'axios'
import { showAlert } from './alerts';
export const signUp=async(name,email,password,passwordConfirm)=>{
    try{
        const response=await axios({
            method:'POST',
            url:`${window.location.protocol}//${window.location.host}/api/v1/users/signUp`,
            data:{
                name,email,password,passwordConfirm,photo:'default.jpg'
            }
        });
        if(response.data.status==='success'){     
            showAlert('success',`Welcome to Natours, ${name}`);       
            window.setTimeout(()=>{location.assign('/')},1000);
        }
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}