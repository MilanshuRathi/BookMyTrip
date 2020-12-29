# BookMyTrip

An application which provides tour and travel packages around the globe,here is the [live version](https://natours-explore.herokuapp.com/)

## Description

It is an application made using NodeJs.When you visit the homepage it has all the tours.It also has a login and signup pages where you will create your account to buy those tours. This application further contains some features like reviewing the tour and each tour has a detailed description where you can see reviews of other people before you buy it.Other than that,as we all know security is most important so the payment process is done by [stripe](https://stripe.com/) integration and for authentication of users [JWT](https://jwt.io/)s approach with cookies is used,[MongoDB](https://www.mongodb.com/) is used for database management, all the data is fetched from the api and rendered on the front end through [Pug](https://pugjs.org/api/getting-started.html) templates.

## Few requirements 
- NodeJs >= v12.18.3
- npm v6.14.8
- MongoDB

## API related information

Due to security issues,I have not provided .env file here,therefore you need to create your own .env file in case you want to work on this project or run it locally,where you have to define these keys

### Server and Database keys
1. NODE_ENV -> node environment (development or production).
2. PORT
3. DB_LOCAL -> Local database link (If you are working on local database).
   or 
4. DB -> Hosted database link (if you are working on hosted database).
5. DB_PASSWD -> hosted database password.

### Authentication keys
6. JWT_SECRET_KEY -> Generate your secret jwt key.
7. JWT_EXPIREIN -> expiration time of jwt key (max logged in duration on api).
8. JWT_COOKIE_EXPIREIN= expiration time of cookie (max logged in duration on website).

### Email keys 

#### These are from mailtrap (for development purpose)
You need to create a mailtrap account for this.

9. MAILTRAP_HOST -> mailtrap host.
10. MAILTRAP_PORT -> mailtrap port.
11. MAILTRAP_USERNAME -> mailtrap username.
12. MAILTRAP_PASSWD -> your mailtrap password.

 #### These are from gmail (for production purpose)
13. EMAIL ->gmail id.
14. PASSWORD -> gmail password.
You need to enable access of [less secure apps](https://myaccount.google.com/lesssecureapps) in gmail for this.

#### Admin details
15. EMAIL_FROM -> reciever will see this email of admin in his email

#### Payment Related Keys
   
16. STRIPE_SECRET_KEY -> your stripe secret key( for server integration ).
17. STRIPE_PUBLIC_KEY -> your stripe public key( for frontend checkout ).
18. STRIPE_WEBHOOK_KEY -> your stripe webhook key ( for adding another endpoint after successfull payment ).

## How To Start
1. Open two terminals and open this project.
2. Run npm install on 1st terminal and on 2nd run npm run build:js close 2nd terminal.
3. Run npm start.
4. Open http://localhost:3000/ on your browser.

For further queries drop a mail to me at my mail id in my profile 
 