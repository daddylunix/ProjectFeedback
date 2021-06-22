const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.authentication = async (req, res, next ) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({success:false, message:"Not authorized to access this route..."})
    }

    try {
        const decoded = jwt.verify(token, "secretTokenHere");
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({success:false, message:"User doesn't exist."})
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({success:false, message:"Not Authorized to access this route"})
    }
}
