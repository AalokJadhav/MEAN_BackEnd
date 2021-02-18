const mongoose = require('mongoose');

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

employeeSchema.pre('save', async function(next) {
    const passwordHash = await bcrypt.hash(password, 10);
    next();
})
// We need to create Collections

const Register = new mongoose.model('Register', employeeSchema);
module.exports = Register;