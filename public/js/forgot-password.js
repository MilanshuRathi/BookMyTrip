import axios from 'axios'
import {showAlert} from './alerts'
export const forgotPassword=async (email)=>{
    try{
        const response=await axios({
            method:'POST',
            url:'/api/v1/users/forgotPassword',
            data:{
                email
            }
        });
        if(response.data.status==='success')
            showAlert('success',response.data.message);
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}
export const resetPassword=async (password,passwordConfirm,token)=>{
    try{
        const response=await axios({
            method:'PATCH',
            url:`/api/v1/users/resetPassword/${token}`,
            data:{
                password,passwordConfirm
            }
        });
        if(response.data.status==='success'){
            showAlert('success','Your password is reset now');
            window.setTimeout(()=>location.assign('/'),1500);
        }            
    }
    catch(err){        
        showAlert('error',err.response.data.message);
    }
}