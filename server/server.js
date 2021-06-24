const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const io = require('./socket').init(server);

const setupHandlers = require('./handlers');
const Feedback = require("./models/Feedback");

const getFeedback = async () => await Feedback.find({})

const onConnection = async (socket) => {
    console.log('Client connected with id: ' + socket.id);

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    socket.on("disconnect", (e) => {
        console.log(e)
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
