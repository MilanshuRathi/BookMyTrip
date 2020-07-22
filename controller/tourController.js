const fs=require('fs');
const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`,'utf-8'));
const randomIdGenerator=()=>{
    const str="123456789abcdefghijklmnopqrstuvwxyz";
    let id="";
    for(let i=1;i<=24;i++)
        id+=str[Math.floor(Math.random()*str.length)];
    return id;
};
exports.checkId=(request,response,next,val)=>{
    const tourArr=tours.find(tour=>tour._id===val);
    if(!tourArr){
        return response.status(404).json({
            status:'fail',
            data:{
                message:'Invalid ID'
            }
        });
    }
    next();
};
exports.getAllTours=(request,response)=>{
    response.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    });
};
exports.createTour=(request,response)=>{
    const id=randomIdGenerator();    
    const newTour=Object.assign({_id:id},request.body);    
    tours.push(newTour);
    fs.writeFile(`${__dirname}//../dev-data/data/tours.json`,JSON.stringify(tours),'utf-8',err=>{
        if(err){response.status(404).json({status:'error',data:{message:'404 error not found'}});}
        else{
            response.status(201).json({
                status:'success',
                data:{
                    tours
                }
            });
        }        
    });
};
exports.getTourById=(request,response)=>{
    const id=request.params.id;    
    const tourArr=tours.find(tour=>tour._id===id);    
    response.status(200).json({
        status:'success',
        data:{
            tour:tourArr
        }
    });
};
exports.updateTourById=(request,response)=>{
    const id=request.params.id;
    const tour=tours.find(tour=>tour._id===id);    
    response.status(200).json({
        status:'success',        
        data:{
            message:'Tour updated'
        }
    });    
};
exports.deleteTourById=(request,response)=>{
    const id=request.params.id;
    const tour=tours.find(tour=>tour._id===id);        
    response.status(200).json({
        status:'success',        
        data:null
    });        
};