const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeRegistration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Conncetion Successful..!`);
}).catch((e) => {
    console.log(`No Conncetion..!`);
})