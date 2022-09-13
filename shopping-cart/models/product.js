const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
    imagePath:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', schema)
module.exports = Product