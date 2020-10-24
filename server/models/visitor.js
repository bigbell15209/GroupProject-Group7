/*// require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias


let VisitorSchema = Schema({
        visitorname: String,
        // password: String,
       email: String,
       displayName: String,
       created:
       {
           type: Date,
           default: Date.now()
       },
       update:
       {
           type:Date,
           default: Date.now()
       }
       
    },
    {
        collection: "visitors"
    });

//configure options for User Model
//let options = ({missingPasswordError: 'Wrong / Missing Password'});
//Visitor.plugin(passportLocalMongoose, options);
//module.exports.Visitor = mongoose.model('Visitor', Visitor);

VisitorSchema.plugin(passportLocalMongoose);

module.exports.Visitor = Model('Visitor', VisitorSchema);
*/

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let VisitorSchema = Schema({
    visitorname: String,
    //password: String
    email: String,
    displayName: String,
    created:
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'visitors'
});

VisitorSchema.plugin(passportLocalMongoose);


module.exports.Visitor = Model('Visitor', VisitorSchema);