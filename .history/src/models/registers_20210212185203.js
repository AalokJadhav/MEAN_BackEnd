const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

employeeSchema.pre('save', async function (next) {
    if(this.ismodified('password')){
    console.log(`The current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`The current Hash password is ${this.password}`);
        // this.confirmpassword = undefined;
    }
    next();
})
// We need to create Collections

const Register = new mongoose.model('Register', employeeSchema);
module.exports = Register;