const nodemailer=require('nodemailer');
const sendEmail=async reciever=>{
    //Create a transporter (service) used to send email
    const transporter=nodemailer.createTransport({
        host:process.env.MAILTRAP_HOST,
        port:process.env.MAILTRAP_PORT,
        auth:{
            user:process.env.MAILTRAP_USERNAME,
            pass:process.env.MAILTRAP_PASSWD
        }
    });
    //Mail information ...
    const mailInfo={
        from:"Admin <natours.io>",
        to:reciever.email,
        subject:reciever.subject,
        text:reciever.message
        //html
    }    
    await transporter.sendMail(mailInfo);
};
module.exports=sendEmail;