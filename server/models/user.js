/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

// require modules for the User model 
let mongoose = require('mongoose');
let crypto = require('crypto');
let Schema = mongoose.Schema;
// let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = mongoose.Schema(
    {
        username:
        {
            type: String,
            unique: true,
            trim: true,
            required: 'username is required'
        },
        password: {
            type: String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },
        salt: {
            type: String
        },
        provider: {
            type: String,
            required: 'Provider is required'
        },
        providerId: String,
        providerData: {},
        created: {
            type: Date,
            default: Date.now
        },
        email:
        {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
            trim: true,
            required: 'email is required'
        },
        userType:
        {
            type: String,
            trim: true,
            required: 'usertype is required'
        }
    },
    {
        collection: "users"
    }
);

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,
    callback) {
    var possibleUsername = username + (suffix || '');
    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) +
                    1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

//configure options for User Model
// let options = ({ missingPasswordError: 'Wrong / Missing Password'});
// User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', UserSchema);