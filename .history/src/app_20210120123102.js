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

app.get('/', (req, res) => {
    res.send('Hello from the Home side..!');
});

// create a new user in our database
app.post('/register', async (req, res) => {
    try {
        console.log(req.body.firstname);
        res.send(req.body.firstname);

        // To check password are same or not
        const password = req.body.password;
        const Cpassword = req.body.confirmpassword;
        if (password === Cpassword) {

        }else{
            res.send('Password are nor matching..!')
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});