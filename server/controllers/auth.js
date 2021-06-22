const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next ) => {
    if (req.body.password.length < 6) {
        res.status(400).json({success:false, error:"Password too short"})
    } else {
        try {
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
            res.status(500).json({
                success: false,
                error: error.message
            })
        } }
};

exports.login = async (req, res, next ) => {
    if (!req.body.email || !req.body.password ) {
        res.status(400).json({ success: false, error: "Please provide email and password"});
        return;
    }
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(404).json({success: false, error:"Invalid credentials"})
            return;
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) res.status(400).json({success: false, error: "Invalid Credentials"})
        const token = await jwt.sign({ id: user._id }, "secretTokenHere")
        res.status(201).json({
            success: true,
            token:token
        })
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
        return;
    }
};

exports.forgotpassword = (req, res, next ) => {
    res.send("Forgot password route");
};

exports.resetpassword = (req, res, next ) => {
    res.send("reset password route")
}
