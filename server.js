//Importing Express application from app.js
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const mongoose=require('mongoose');

//Configuring connection with Database
process.env.DB=process.env.DB.replace('<PASSWORD>',process.env.DB_PASSWD);
mongoose.connect(process.env.DB,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true}).then(()=>console.log('Connection to DB is successful'));
//In case to connect with local database
// mongoose.connect(process.env.DB_LOCAL,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:true}).then(con=>console.log(con)).catch(err=>console.log(err));
 
const app=require(`${__dirname}/app`);
const port=process.env.PORT||3000;
//Starts server
app.listen(port,()=>{console.log(`Server running on port:${port}`);});