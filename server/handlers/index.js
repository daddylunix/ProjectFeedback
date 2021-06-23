const feedbackHandler = require('./feedback.handler');


module.exports = (io, socket) => {
    feedbackHandler(io, socket)
}
