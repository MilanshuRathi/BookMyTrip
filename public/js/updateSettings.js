import axios from 'axios'
import {showAlert} from './alerts'
export const updateUser=async (name,email)=>{
    try{
        const response=await axios({
            method:'PATCH',
            url:`${window.location.protocol}//${window.location.host}/api/v1/users/updateMe`,
            data:{
                name,email
            }
        });
        if(response.data.status==='success')
            showAlert('success','Data updated Successfully!');                    
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}
export const updatePassword=async (passwordCurrent,password,passwordConfirm)=>{
    try{
        const response=await axios({
            method:'PATCH',
            url:`${window.location.protocol}//${window.location.host}/api/v1/users/updatePassword`,
            data:{
                passwordCurrent,
                password,
                passwordConfirm
            }
        });
        if(response.data.status==='success')
            showAlert('success','Password updated Successfully!');
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}