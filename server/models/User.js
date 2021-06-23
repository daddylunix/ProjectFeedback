const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username in use"],
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: [true, "Email inuse"]
    },
    password: {
        min: 6,
        type: String,
        required: [true, "Please provide a password"]
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});


UserSchema.methods.matchPasswords = async (password) => {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
