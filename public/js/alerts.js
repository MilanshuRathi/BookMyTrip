export const showAlert=(type,message,time=3)=>{
    hideAlert();    
    const htmlString=`<div class='alert alert--${type}'>${message}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin',htmlString);
    window.setTimeout(()=>{hideAlert();},time*1000);
}
const hideAlert=()=>{
    const el=document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
}