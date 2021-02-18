require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');

const hbs = require('hbs');
require('../src/db/conn');
const Register = require('../src/models/registers');

const port = process.env.PORT || 3000

const static_path = path.join(__dirname, '../public');
// console.log(path.join(__dirname, '../public'));

const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

// console.log(process.env.SECRET_KEY);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/secret', auth, (req, res) => {
    res.render('secret');
    // console.log(`this is the cookie  ${req.cookies.jwt}`);
});

app.get('/logout', auth, async(req, res) => {
    try {
        console.log(req.user);

        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token !== req.token;
        })
        res.clearCookie('jwt');
        console.log('Logout Successfully...!');

        await req.user.save();
        res.render('login');
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', (req, res) => {
    res.send('Hello from the Home side..!');
});

// create a new user in our database
app.post('/register', async (req, res) => {
    try {
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        console.log(req.body);

        // To check password are same or not
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                confirmpassword: cpassword,

            });
            console.log('the success part: ' + registerEmployee);

            const token = await registerEmployee.genrateAuthToken();
            console.log('the token part: ' + token);

            // the res.cookie() function is used to set the cookie name to value.
            // The value parameter may be a string or object converted to JSON

            // Syntax: res.cookie(name, value, [options])

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true
            });
            console.log(cookie);

            const registerd = await registerEmployee.save();
            console.log('the page part:' + registerd);

            res.status(201).render('index');
        } else {
            res.send('Invalid login Details..!')
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

// login check

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email });
        //    res.send(useremail);
        //    console.log('UserEmail:',useremail);

        const isMatch = await bcrypt.compare(password, useremail.password);
        console.log('IsMatch:',isMatch);

        const token = await useremail.genrateAuthToken();
        console.log('the token part: ' + token);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 500000),
            httpOnly: true,
            // secure: true
        });
        console.log('Cookie:',res.cookie);
         console.log(`this is the cookie  ${req.cookies.jwt}`);


        if (isMatch) {
            
            res.status(201).render('index');
        } else {
            res.send('Invalid login Details.!')
        }
        // console.log(`Your email is ${email} and password is ${password}`);
    } catch (error) {
        res.status(400).send('Invalid login Details..!');

    }
})

// Create Token

const createToken = async () => {
    const token = await jwt.sign({ _id: '60085203b641332ec0fbf449' }, 'alokgurunathjadhav', {
        expiresIn: '2 minutes'
    });
    console.log(token);

    const userverify = await jwt.verify(token, 'alokgurunathjadhav');
    console.log(userverify);
}
createToken();


// Bycript 

// const bcrypt = require('bcryptjs');
// const securepassword = async (password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordMatch = await bcrypt.compare(password, passwordHash);
//     console.log(passwordMatch);
// }
// securepassword('Alok@143');
app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});