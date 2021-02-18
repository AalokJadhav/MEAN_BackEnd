const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true

    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true
    }
});

// Genrating Token

employeeSchema.methods.genrateAuthToken = async function() {
    try {
        const token = jwt.sign({_id: this._id.toString()}, 'mynameisalokgurunathjadhav');
        console.log(token);
    } catch (error) {
        res.send('the error part' + error);
        console.log('the error part' + error);
    }
}

// Converting Password into Hash
employeeSchema.pre('save', async function (next) {
    if(this.isModified('password')){
    console.log(`The current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`The current Hash password is ${this.password}`);
        this.confirmpassword = undefined;
    }
    next();
})
// We need to create Collections

const Register = new mongoose.model('Register', employeeSchema);
module.exports = Register;