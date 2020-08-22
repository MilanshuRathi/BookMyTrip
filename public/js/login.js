import axios from 'axios'
import { showAlert } from './alerts';
export const login=async (email,password)=>{    
    try{
        const response=await axios({
            method:'POST',
            url:'/api/v1/users/login',
            data:{
                email,password
            }
        });         
        if(response.data.status==='success'){
            showAlert('success','Hello there, Just logging you in!');            
            window.setTimeout(()=>{location.assign('/')},1000);
        }       
    } 
    catch(err){
        showAlert('error',err.response.data.message);
    }
};
export const logout=async ()=>{
    try{
        const response=await axios({
            method:'GET',
            url:'/api/v1/users/logout',
        });               
        if(response.data.status==='success'){                        
            location.reload(true);
            //marked as true to force the server to reload the page....otherwise it will get reloaded from browser cache
        }
    }
    catch(err){        
        showAlert('error','Error logging out,Try again..');
    }    
};
