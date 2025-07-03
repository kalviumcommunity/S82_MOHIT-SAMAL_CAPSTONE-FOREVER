###  WORKS

 - Routes =  create paths
 - models = Schema's
 - controllers = main logic of the api endpoints which are connected to the serrver.js and routes 

NOTE == >> (" Like first done in the controller then exported to Routes where endpoints are made then Routes are exported to the Server.js") 







### RELATIONSHIP BETWEEN ENTITIES






### What are the Uses of the Package.json

{
  "name": "capstone-backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
 "dependencies": {
"bcryptjs": "^2.4.3",  /*Encrypt User Password and store in DATABASE*/
"cloudinary": "^2.6.1",
"cors": "^2.8.5",       /*Allow Frontend Ip to use Backend*/
"dotenv": "^16.4.0",    /*Environmental variables*/
"express": "^4.18.2",    /*We can create API's*/
"jsonwebtoken": "^9.0.1", /*Enable User Authentication*/
"mongoose": "^8.3.1",     /*Database Connectivity*/
"multer": "^1.4.5-lts.2", /*Allow/Help to Store Images in the cloudinary*/
"razorpay": "^2.9.6",     /*Payment*/
"stripe": "^12.18.0",     /*Payment*/
"validator": "^13.15.0"     /*Data from User Valid or not*/
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
