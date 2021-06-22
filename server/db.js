const mongoose = require('mongoose');

const ConnectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/react-user-auth', {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true,
       });
       console.log("Successfully connected to MongoDB");
};

module.exports = ConnectDB;
