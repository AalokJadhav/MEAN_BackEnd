##   MEAN_BackEnd


****
** Complete Registration and Login Form using HTML, CSS, NodeJS, ExpressJS, MongoDB

**Please support this project by simply putting a Github star ⭐. 🙏 Thanks**

## Development environment

    1. MongoDB Compass
    2. ExpressJs
    3. Handlerbars
    4. NodeJS
    5. Mongoose
    6. Postman
    7. VS Code Editor

## Dependencies

    1. Express  --- npm i express
    2. Mongoose --- npm i mongoose
 
## Added Script  (For AutoSave)

	  1. "start": "node src/app.js"
	  2. "Dev": "nodemon src/app.js"


## Project functionality

####  Login Form using HTML, CSS, NodeJS, Express, MongoDB


####  Secure Password using BcryptJs in NodeJS and MongoDB

    ##  Encryption Vs Hashing
    
    
    	      ENCRYPTION                               HASHING
	
	  1. Two-way Communication			       1. One-way Communication
	  2. Encrypted msg can be transformed        2. Outputcannot be reversed 
	   in to a original message by using          back to the original message.
	   descryption algorithms & apporopriate
	   Key.
	  3. Uses key                                3. Do not use any key.  
    
    
    	Using Bcrypt 
	
	we have to install bcrypt -----> npm i bcryptjs
	require bcrypt 
	use bcrypt.hash method for Hashing.
	use bcrypt.compare for password matching.
	password is match then it is true otherwise it is false.
	
	
	Bcrypt Implementation:-
	
	we use schema method pre method before save method.
	 ie. employeeSchema.pre('save', async function (next)){};
	 
    Use bcrypt.hash method for Hashing.
	 ie. bcrypt.hash(this.password, 10);
	 
	## Code: 
	
	    employeeSchema.pre('save', async function (next) {
		  if(this.isModified('password')){
		  console.log(`The current password is ${this.password}`);
		  this.password = await bcrypt.hash(this.password, 10);
		  console.log(`The current Hash password is ${this.password}`);
      this.confirmpassword = undefined;
      }
		  next();
	  });
	
	## Note: 
	     1. isModified - when password is modified then password bcrypt hash is run.
		   2. confirmpassword is undefined ie. not stored in database.

####  JSON Web Token (JWT) with NodeJS and MongoDB
      
      	Steps: 
	    1. install npm i jsonwebtoken
	    2. require jsonwebtoken
	    3. createtoken() method
	    4. use jwt.sign({payload-data ie. id:'343554367587554333252'}, 'secratekey- alokgurunathjadhav', {expiresIn});
	
	    ** Note: 
	      There are dot(.) seprated token
		    1st is for header represent with algorithm and type.
		    2nd is for payload-data ie. bodydata
		    3rd is for signature.
	    5. To verfiy token jwt.verfiy(token, 'alokgurunathjadhav')
	    6. expiresIn: '2 minutes' is for expires token in 2 minutes.


#### User Registration with JWT Auth Token using NodeJS and MongoDB


#### User Login with JWT Auth Token using NodeJS and MongoDB


#### Manage Secrets configs using .ENV Package

	     .ENV => Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
	             Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
			
		    ** Steps:
		
		    1. install .env package => npm i dotenv
		    2. require env  => require('dotenv').config()
		    3. Create .env file in root directory
		    4. Add environment-specific variables on new lines in the form of NAME=VALUE
		      ie. SECRET_KEY = mynameisalokgurunathjadhav
		    5. process.env now has the keys and values you defined in your .env file.
        6. Use this Name replace with your SECRET_KEY.
		    7. Create .gitignore file and write .env for ignore your SECRET_KEY is hidden.

#### Secure JWT Aunthentication store JWT Tokens in HTTPOnly Cookie 

      	** Authentication -              
			                      The authentication service is used to login and logout, it notifies other components when the user logs in & out.
			                      and allows access to currently logged in user.
   
		    HTTPOnly is a flag that can be included in a set-cookie response header.
		    The presence of this flag will tell browser to not allowed client side script.
		    Access to the cookie(if the browser supports it).
		
			    // To Store Cookie
			
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true,
				secure: true
            });
            console.log(cookie);

##### How to get Cookie value (JWT Token) using cookie-parser

		    ExpressJS is not provide to get cookie value. thats why we have to install dependency (Cookie-Parser).
		
		    ** Cookie-Parser:
				          Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
				          Optionally you may enable signed cookie support by passing a secret string,
				          which assigns req.secret so it may be used by other middleware.
				
		      # Steps:
		      1. We have to require cookie-parser.
				      const cookieParser = require('cookie-parser');
		      2. we use cookie-parser use as a middleware.
			      ie. app.use(cookieParser());
		      3. After page load we use console.log(`this is the cookie  ${req.cookies.jwt}`);
		        to get the cookie value.


#### User Aunthentication & Authorization with jwt

	      Steps:
	
	      1. Create middleware folder in src.
	      2. create auth.js file.
	      3. add auth argument in required page.
		      ie. app.get('/secret', auth, (req, res) => {
			      res.render('secret');
			      });
	      4. in auth.js
	
		      const jwt = require('jsonwebtoken');
		      const Register = require('../models/registers');

		      const auth = async (req, res, next) => {
		      try {
        
			      const token = req.cookies.jwt;
			      const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
			      console.log(verifyUser);
			      const user = await Register.findOne({_id: verifyUser._id});
			      console.log(user);
			      next();
		      } catch (error) {
              res.status(401).send(error);
		      }
	      }

		      module.exports = auth;  

##### Logout User And Delete Cookie (jsonwebtoken)

	      1. First we have to clear cookie after logout click using res.clearCookie('jwt) and render to the login page.
	
		      ie. 	
				      app.get('/logout', auth, async(req, res) => {
			      try {
				      console.log(req.user);

				      res.clearCookie('jwt');
				      console.log('Logout Successfully...!');

				      await req.user.save();
				      res.render('login');
			      } catch (error) {
				      res.status(400).send(error);
			      }
		      });
		
	      2. Compare current user token and delete from the database.
	
		        req.user.token = req.user.tokens.filter((currentElement) => {
            return currentElement.token !== req.token;

##### Signout from All Devices

		      res.user.tokens = [];
