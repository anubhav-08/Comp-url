const mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    long_url : {
        type : String, 
        required : true,
        unique : true
    },
    short_url : {
        type : String, 
        required : true,
        unique : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;