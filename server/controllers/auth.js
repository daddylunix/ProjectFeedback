const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

exports.register = async (req, res, next ) => {
        try {
            if (req.body.password.length < 6) {
                throw new ApiError("Password too short", 400)
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });
            const token = await jwt.sign({ id: user._id }, "secretTokenHere")
            res.status(201).json({
                success: true,
                token:token
            })
        } catch (error) {
            next(error);
        }
};

exports.login = async (req, res, next ) => {
    if (!req.body.email || !req.body.password ) {
        throw new ApiError("Please provide email and password", 400);
    }

    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            throw new ApiError("Invalid credentials", 401);
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) throw new ApiError("Invalid credentials", 401);

        const token = await jwt.sign({ id: user._id }, "secretTokenHere")
        res.status(200).json({
            token:token
        })
    } catch (error) {
        next(error);
    }
};

exports.forgotpassword = (req, res, next ) => {
    res.send("Forgot password route");
};

exports.resetpassword = (req, res, next ) => {
    res.send("reset password route")
}
