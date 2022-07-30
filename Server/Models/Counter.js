const mongoose = require('mongoose')

var counterSchema = new mongoose.Schema({
    value : {
        type : Number,
        required : true
    }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;