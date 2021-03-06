import axios from 'axios'
import {showAlert} from './alerts'
export const updateUser=async (data)=>{
    try{
        const response=await axios({
            method:'PATCH',
            url:'/api/v1/users/updateMe',
            data
        });
        if(response.data.status==='success'){
            showAlert('success','Data updated Successfully!');                    
            window.setTimeout(()=>location.assign('/me'),1500);
        }            
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}
export const updatePassword=async (data)=>{
    try{
        const response=await axios({
            method:'PATCH',
            url:'/api/v1/users/updatePassword',
            data
        });
        if(response.data.status==='success')
            showAlert('success','Password updated Successfully!');
    }
    catch(err){
        showAlert('error',err.response.data.message);
    }
}