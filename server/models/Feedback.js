const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema);
