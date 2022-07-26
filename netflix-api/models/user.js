const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Please enter your name']
    },
    email : {
        type : String,
        required : [true, 'Please enter your email address'],
        unique : true,
        validate : [validator.isEmail, 'Please enter valid email address']
    },
    role : {
        type : String,
        enum : {
            values : ['user', 'admin'],
            message : 'Please select correct role'
        },
        default : 'user'
    },
    profilePicture: {
        type : String,
        default : ""
    },
    password : {
        type : String,
        required : [true, 'Please enter password for your account'],
        minlength : [8, 'Your password must be at least 8 characters long'],
        select : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
},
{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
}

// Encypting passwords before saving
userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
});

// Return JSON Web Token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id : this._id, username : this.username, email : this.email },
         process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    });
}

// Compare user password in database password
userSchema.methods.comparePassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);