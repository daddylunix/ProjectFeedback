const router = require('express').Router();
const Feedback = require('../models/Feedback');
const ApiError = require("../utils/apiError");
const io = require('../socket');


router.get('/feedback', async(req, res) => {
    try {
        const allFeedback = await Feedback.find({})
        res.json(allFeedback);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})


router.post('/feedback/:id', async (req, res, next) => {
    const userId = req.params.id;
    if(!req.body.body || !req.body.rating ) {
        // TODO: request validation
        throw new ApiError('Invalid request body', 400)
    }
    try {
        const feedback = await Feedback.create({
            user: userId,
            body: req.body.body,
            rating: req.body.rating
        });

        io.getIO().emit('feedback:all', await Feedback.find({}));

        res.json({feedback});
    } catch (error) {
       next(error)
    }
})

router.get('/feedback/:id', async(req, res, next) => {
    try {
        const feedbacks = await Feedback.find({user: req.params.id}).select('-__v');
        res.json(feedbacks);
    } catch (error) {
        next(error)
    }
})

module.exports = router;
