const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const toysSchema = require("./Toys");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true
        },
        listings: [toysSchema]
    }
);

const User = model('User', userSchema);

module.exports = User;