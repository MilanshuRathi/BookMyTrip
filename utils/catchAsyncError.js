module.exports=fn=>{
    return (request,response,next)=>{        
        fn(request,response,next).catch(next);
    }
}