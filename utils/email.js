const nodemailer=require('nodemailer');
const pug=require('pug');
const htmlTOText=require('html-to-text');
module.exports=class Email{
    constructor(user,url){
        this.to=user.email;
        this.firstName=user.name.split(' ')[0];
        this.url=url;
        this.from=`Milanshu Rathi ${process.env.EMAIL_FROM}`;
    }
    newTransport(){
        if(process.env.NODE_ENV==='production'){
            //Sendgrid
            return nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.EMAIL,
                    pass:process.env.PASSWORD
                }
            });
        }
        return nodemailer.createTransport({
            host:process.env.MAILTRAP_HOST,
            port:process.env.MAILTRAP_PORT,
            auth:{
                user:process.env.MAILTRAP_USERNAME,
                pass:process.env.MAILTRAP_PASSWD
            }
        });
    }
    async send(template,subject){        
        //1) Render HTML based on pug template 
        const html=pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
            firstName:this.firstName,
            url:this.url,
            subject
        });//it will take a pug template and render it into html 
        //2)Define mailoptions
        const mailOptions={
            from:this.from,
            to:this.to,
            subject,
            html,
            text:htmlTOText.fromString(html)            
        }
        //3)Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome(){
        await this.send('welcome','Welcome to BookMyTrip!');
    }
    async sendResetPassword(){
        await this.send('passwordReset','Password Reset Link(valid for just 10 minutes)')
    }
}