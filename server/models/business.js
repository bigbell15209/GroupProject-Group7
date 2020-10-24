let mongoose = require('mongoose');
let Schema = mongoose.Schema; 
let Model = mongoose.model; 

let BusinessSchema = new Schema({
    company: String,
    name: String,
    email: String,
    number: String
},
{
    collection: 'business'
});

module.exports.Model = Model('Business', BusinessSchema);