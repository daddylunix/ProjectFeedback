const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

router.get('/', async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
          throw new ApiError('unauthorized', 401);
        }

        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, "secretTokenHere");
        const user = await User.findOne({_id: decoded.id});
        if(!user) return res.json({success: false, message:"Nice try :)"})
        return res.json({msg: user});
    }catch(e){
        next(e);
    }


})

module.exports = router;
