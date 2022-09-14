const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const schema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
schema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSalt(5), null)
}
schema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', schema)
module.exports = User