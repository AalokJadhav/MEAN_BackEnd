const express = require('express');
const app = express();
const path = require('path');

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
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render('index');
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
            // Password Hash
            // Middleware


            const registerd = await registerEmployee.save();
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
        //    console.log(useremail);

        if (useremail.password === password) {
            res.status(201).render('index');
        } else {
            res.send('Invalid login Details..!')
        }
        // console.log(`Your email is ${email} and password is ${password}`);
    } catch (error) {
        res.status(400).send('Invalid email');

    }
})

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