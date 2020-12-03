
let mongoose = require('mongoose');

//create a model class
let messageModel = mongoose.Schema({

    fullName: String,
    contactNumber: Number,
    emailAddress: String,
    message: String
},
{
  collection: "messages"
});

module.exports = mongoose.model('Message', messageModel);
