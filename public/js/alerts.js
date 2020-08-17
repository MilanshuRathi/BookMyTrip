export const showAlert=(type,message)=>{
    hideAlert();    
    const htmlString=`<div class='alert alert--${type}'>${message}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin',htmlString);
    window.setTimeout(()=>{hideAlert();},3000);
}
const hideAlert=()=>{
    const el=document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
}