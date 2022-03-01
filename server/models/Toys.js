const { Schema, model } = require('mongoose');

const toysSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [
        {
            comment: String,
            author: String,
            checked: Boolean
        }
    ]
});

const Toys = model('Toys', toysSchema);

module.exports = Toys;