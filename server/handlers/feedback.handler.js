
const Feedback = require('../models/Feedback');

module.exports = (io, socket) => {
    const readFeedback = async () => {
        socket.emit("feedback:read", 'asdfsf');

        // try {
        //     const allFeedback = await Feedback.find({})
        //     socket.emit("feedback:read", allFeedback);
        // } catch (error) {
        //     console.log(error);
        // }

    }

    const createFeedback = (payload) => {
        callback();

    }
    socket.on("feedback:read", readFeedback);
    socket.on("feedback:create", createFeedback);
}
