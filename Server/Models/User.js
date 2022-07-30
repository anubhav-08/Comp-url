const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAccessToken = async function () {
    const expire = 5 * 60; // 5 minutes
    try {
        let access_token = jwt.sign({ user: this._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: expire });
        return access_token;
    }
    catch (err) {
        console.log(err);
    }
}

userSchema.methods.generateRefreshToken = async function () {
    const expire = 365 * 24 * 60 * 60; //1year
    try {
        let refresh_token = jwt.sign({ user: this._id }, process.env.REFRESH_SECRET_KEY, { expiresIn: expire });
        await new RefreshToken({ token: refresh_token, user: this._id }).save();
        return refresh_token;
    }
    catch (err) {
        console.log(err);
    }
}

userSchema.pre('save', async function (next) {

    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }

    next();
});



const User = mongoose.model('User', userSchema);

module.exports = { User, RefreshToken };