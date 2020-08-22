import '@babel/polyfill'
import {login,logout} from './login' 
import {signUp} from './signup'
import {displayMap} from './mapBox'
import {updateUser, updatePassword} from './updateSettings'
import {forgotPassword,resetPassword} from './forgot-password'
import { bookTour } from './stripe'
import { showAlert } from './alerts'
import {submitReview} from './makeReview'
const mapBox=document.getElementById('map');
if(mapBox){
    const locations=JSON.parse(document.getElementById('map').dataset.locations);
    displayMap(locations);
}
const bookingButton=document.getElementById('bookingButton');
if(bookingButton){
    bookingButton.addEventListener('click',()=>{
        bookingButton.textContent='Processing Payment..';
        const {tourId}=bookingButton.dataset;        
        bookTour(tourId);        
    });
}
const searchTours=document.getElementById('searchTours');
if(searchTours){
    const divArr=document.querySelectorAll('.card'); 
    let nameArr=[];
    for(const d of divArr){        
        nameArr.push(d.querySelector('span').textContent.toLowerCase());        
    }    
    const container=document.querySelector('.card-container');
    searchTours.addEventListener('keyup',event=>{ 
        container.innerHTML="";               
        const searchTour=searchTours.querySelector('.nav__search-input').value;                         
        for(let i=0;i<9;i++){
            if(searchTour===''||nameArr[i].includes(searchTour.toLowerCase()))
                container.appendChild(divArr[i]);            
        }
    });
}
const loginForm=document.getElementById('loginForm'),signUpForm=document.getElementById('signUpForm'),userDetailsUpdate=document.getElementById('userDetailsUpdate'),passwordForm=document.getElementById('passwordForm');
const forgotForm=document.getElementById('forgotForm'),resetForm=document.getElementById('resetForm');
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
        const userForm=new FormData();
        userForm.append('name',document.getElementById('name').value);
        userForm.append('email',document.getElementById('email').value);
        userForm.append('photo',document.getElementById('photo').files[0]);
        document.querySelector('.updateSettingBtn').textContent='Updating...';          
        await updateUser(userForm);
        document.querySelector('.updateSettingBtn').textContent='Save settings';
    });
}
if(passwordForm){
    passwordForm.addEventListener('submit',async event=>{        
        event.preventDefault();
        document.querySelector('.updatePasswdBtn').textContent='Updating...';
        const passwordCurrent=document.getElementById('password-current').value,password=document.getElementById('password').value,passwordConfirm=document.getElementById('password-confirm').value;            
        await updatePassword({passwordCurrent,password,passwordConfirm});
        document.querySelector('.updatePasswdBtn').textContent='Save password';
    });
}
if(forgotForm){
    forgotForm.addEventListener('submit',event=>{
        event.preventDefault();
        forgotPassword(document.getElementById('email').value);
    });
}
if(resetForm){
    resetForm.addEventListener('submit',event=>{
        event.preventDefault();
        const urlPart=location.pathname;
        resetPassword(document.getElementById('password').value,document.getElementById('passwordConfirm').value,urlPart.substr(urlPart.lastIndexOf('/')+1));
    });
}
const logOutLink=document.querySelector('.nav__el--logout');
if(logOutLink){
    logOutLink.addEventListener('click',logout);
}
const reviewForm=document.getElementById('reviewForm');
if(reviewForm){
    const starArr=['one','two','three','four','five'];    
    let rating=0;
    starArr.forEach(element=>{        
        document.getElementById(element).addEventListener('click', function(){
            const  cls=document.getElementById(element).className;
            if(cls.includes('unchecked'))
            {
                document.getElementById(element).classList.remove('unchecked');
                document.getElementById(element).classList.add('checked');
                rating++;
            }
            else{
                document.getElementById(element).classList.remove('checked');
                document.getElementById(element).classList.add('unchecked'); 
                rating--;
                if(rating<0)
                    rating=0;
            }               
        });
    });
    reviewForm.addEventListener('submit',event=>{
        event.preventDefault();
        const reviewVal=document.getElementById('reviewBox').value;
        if(rating==0||reviewVal==='')
        {showAlert('error','Please complete your review');return;}
        const {tourId}=document.getElementById('reviewButton').dataset;
        submitReview(tourId,reviewVal,rating);        
    }); 
}
const alertMessage=document.querySelector('body').dataset.alert;
if(alertMessage)
    showAlert('success',alertMessage,10);