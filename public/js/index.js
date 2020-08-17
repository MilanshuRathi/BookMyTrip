import '@babel/polyfill'
import {login,logout} from './login' 
import {signUp} from './signup'
import {displayMap} from './mapBox'
import {updateUser, updatePassword} from './updateSettings'
const mapBox=document.getElementById('map');

if(mapBox){
    const locations=JSON.parse(document.getElementById('map').dataset.locations);
    displayMap(locations);
}
const loginForm=document.getElementById('loginForm'),signUpForm=document.getElementById('signUpForm'),userDetailsUpdate=document.getElementById('userDetailsUpdate'),passwordForm=document.getElementById('passwordForm');
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
if(userDetailsUpdate){
    userDetailsUpdate.addEventListener('submit',async event=>{
        event.preventDefault();
        document.querySelector('.updateSettingBtn').textContent='Updating...';        
        const name=document.getElementById('name').value,email=document.getElementById('email').value;
        await updateUser(name,email);
        document.querySelector('.updateSettingBtn').textContent='Save settings';
    });
}
if(passwordForm){
    passwordForm.addEventListener('submit',async event=>{
        document.querySelector('.updatePasswdBtn').textContent='Updating...';
        event.preventDefault();
        const passwordCurrent=document.getElementById('password-current').value,password=document.getElementById('password').value,passwordConfirm=document.getElementById('password-confirm').value;            
        await updatePassword(passwordCurrent,password,passwordConfirm);
        document.querySelector('.updatePasswdBtn').textContent='Save password';
    });
}
const logOutLink=document.querySelector('.nav__el--logout');
if(logOutLink){
    logOutLink.addEventListener('click',logout);
}
