const router = require('express').Router();
const Feedback = require('../models/Feedback');

router.post('/feedback/:id', async (req, res) => {
    const userId = req.params.id;
    if(!req.body.body || !req.body.rating ) {
        return res.json({msg:"Fill everything below."})
    }
    try {
        const feedback = await Feedback.create({
            user: userId,
            body: req.body.body,
            rating: req.body.rating
        })
        res.json({feedback});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

router.get('/feedback/:id', async(req, res) => {
    try {
        const feedbacks = await Feedback.find({user: req.params.id})
        res.json(feedbacks);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

module.exports = router;
