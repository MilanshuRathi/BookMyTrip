const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:`${__dirname}/../../config.env`});
const Tour=require(`${__dirname}/../../models/tourModel`);
const path=process.env.DB.replace('<PASSWORD>',process.env.DB_PASSWD);
mongoose.connect(path,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true});
const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
const importData=async()=>{
    try{
        await Tour.create(tours);
        console.log('Data loaded successfully');
    }    
    catch(err){
        console.log(err);
    }
    process.exit();
};
const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        console.log('Data deleted successfully');
    }    
    catch(err){
        console.log(err);
    }
    process.exit();
};
if(process.argv[2]==='--import')
    importData();
else if(process.argv[2]==='--delete')
    deleteData();
else
    process.exit();