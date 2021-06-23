const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


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

let interval;

const feedbackHandler = require('./handlers/feedback.handler');

const Feedback = require('./models/Feedback');

const onConnection = async (socket) => {
    console.log("New client connected");
    const allFeedback = await Feedback.find({})
    socket.emit("feedback:read", allFeedback);

    socket.on("feedback:create", async (payload) => {
        console.log(payload)
        await Feedback.create({
            user: payload.user,
            body: payload.body,
            rating: payload.rating
        })
        socket.emit('feedback:create', [...allFeedback, payload] )
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
}

io.on("connection", onConnection);



// Start server
server.listen(5000, () => console.log('Server running on port 5000'))

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})
