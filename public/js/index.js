import '@babel/polyfill'
import {login,logout} from './login' 
import {signUp} from './signup'
import {displayMap} from './mapBox'
const mapBox=document.getElementById('map');

if(mapBox){
    const locations=JSON.parse(document.getElementById('map').dataset.locations);
    displayMap(locations);
}
const loginForm=document.getElementById('loginForm'),signUpForm=document.getElementById('signUpForm');
if(loginForm){    
    loginForm.addEventListener('submit',event=>{
        event.preventDefault();
        const email=document.getElementById('email').value,password=document.getElementById('password').value;    
        login(email,password);
    });
}
if(signUpForm){
    signUpForm.addEventListener('submit',event=>{
        event.preventDefault();
        const name=document.getElementById('name').value,email=document.getElementById('email').value,password=document.getElementById('password').value,passwordConfirm=document.getElementById('passwordConfirm').value;            
        signUp(name,email,password,passwordConfirm);
    });
}
const logOutLink=document.querySelector('.nav__el--logout');
if(logOutLink){
    logOutLink.addEventListener('click',logout);
}
