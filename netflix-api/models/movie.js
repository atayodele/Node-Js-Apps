const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    ComingSoon : {
        type : Boolean,
        default : false
    },
    Title : {
        type : String,
        required : true,
        unique : true
    },
    Year : {type : String},
    Rated : {type : String},
    Released : {type : String},
    Runtime : {type : String},
    Genre : {type : Array},
    Director : {type : String},
    Writer : {type : String},
    Actors : {type : String},
    Plot : {type : String},
    Poster : {type : String},
    Trailer : {type : String, default : ""},
    Language : {type : String},
    Country : {type : String},
    Awards : {type : String},
    Metascore : {type : String},
    totalSeasons : {type : String, default : ""},
    Images : {type : Array},
    Type : {type : String},
    createdAt : {
        type : Date,
        default : Date.now
    }
});

movieSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}

module.exports = mongoose.model('Movie', movieSchema);