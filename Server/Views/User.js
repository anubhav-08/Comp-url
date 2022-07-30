const User = require('../Models/User').User;
const bcrypt = require('bcryptjs')

exports.register = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
    });
    user
        .save(user)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            })
        })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ "message": "please fill your details" });
    }

    try {

        const userExists = await User.findOne({ email: email });

        if (userExists) {

            const isMatch = await bcrypt.compare(password, userExists.password);

            if (isMatch) {
                // generate jwt for authentication
                const access_token = await userExists.generateAccessToken();
                const refresh_token = await userExists.generateRefreshToken();
                res.json({ "message": "loggedin successfully", "access_token": access_token, "refresh_token": refresh_token });

            } else {
                return res.status(400).send({ "message": "invalid credentials" });
            }
        } else {
            return res.status(400).send({ "message": "invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ "message": "invalid credentials" });
    }
}

exports.profile = (req, res) => {

}