const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cors({credentials:true}));
app.use(cookieParser());


// Connect to database
mongoose.connect('mongodb://localhost:27017/react-user-auth', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true
},
    console.log("Connected to MongoDB")
)

// Routes 
app.use("/api/auth", require("./routes/auth"));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/', require('./routes/Feedback'));

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    console.log(err);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

// Start server
const server = app.listen(5000, () => console.log('Server running on port 5000'))



process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})
