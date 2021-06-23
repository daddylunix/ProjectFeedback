const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");

router.get('/', async (req, res ) => {
    if (!req.headers.authorization || req.headers.authorization == "undefined" || req.headers.authorization == undefined) {
        return res.json({msg:"not logged in"})
    } else {
        try {
            const token = req.headers.authorization;
            const decoded = await jwt.verify(token, "secretTokenHere");
            const user = await User.findOne({_id: decoded.id});
            if(!user) res.json({success: false, message:"Nice try :)"})
            else {
                res.json({msg: user})
            }
        } catch (error) {
            console.log(error);
        }
    }
})

module.exports = router;
