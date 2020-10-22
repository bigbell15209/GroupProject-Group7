// require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


let Visitor = mongoose.Schema
(
    {
        visitorname:
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        /*
        password:
        {
            type: String,
            defalt: '';
            trim: true,
            required: 'password is required'
        }
        */
       email:
       {
           type:String,
           default: '',
           trim: true,
           required: 'email address is required'
       },
       displayName:
       {
           type:String,
           default: '',
           trim: true,
           required: 'Display Name is required'
       },
       created:
       {
           type:Date,
           default: Date.now
       },
       update:
       {
           type:Date,
           default: Date.now
       }
       
    },
    {
        collection: "visitors"
    }
);

//configure options for User Model

let options = ({missingPasswordError: 'Wrong / Missing Password'});

Visitor.plugin(passportLocalMongoose, options);

module.exports.Visitor = mongoose.model('Visitor', Visitor);