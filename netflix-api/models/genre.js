const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter genre name'],
        unique : true
    },
    movies : {
        type : mongoose.Schema.ObjectId,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

genreSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}

module.exports = mongoose.model('Genre', genreSchema);