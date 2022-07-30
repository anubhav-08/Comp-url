const Address = require('../Models/Address');
const User = require('../Models/User').User;
const shortUrlGen = require('../Utils/HashingFunctions')

exports.shortToLong = (req, res) => {
    const short_url = req.params.id;
    Address.findOne({ short_url: short_url })
        .then(address => {
            res.status(301).redirect(address.long_url);
            res.json({
                "long_url": address.long_url
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred" });
        })
};

exports.storeLong = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    short_url = await shortUrlGen();
    const address = new Address({
        long_url: req.body.url,
        short_url: short_url,
        user: req.user
    });
    address
        .save(address)
        .then(data => {
            res.json({
                "long url fed": data.long_url,
                "short url generated":  req.protocol + '://' + req.get('host') + '/' + data.short_url
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            })
        })
};

exports.listAll = async (req, res) => {
    const id = req.user;
    const user = await User.findById(id)
        .then(data => data)
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred" });
        })
    Address.find({ user: user.id })
        .then(addresses => {
            res.json(addresses);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred" });
        })
};