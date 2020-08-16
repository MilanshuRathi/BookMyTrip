// const axios=require('axios');
const login=async (email,password)=>{    
    try{
        const token=await axios({
            method:'POST',
            url:'http://127.0.0.1:3000/api/v1/users/login',
            data:{
                email,password
            }
        });        
    } 
    catch(err){
        console.log(err.response.data);
    }
}
document.querySelector('form').addEventListener('submit',event=>{
    event.preventDefault();
    const email=document.getElementById('email').value,password=document.getElementById('password').value;    
    login(email,password);
});