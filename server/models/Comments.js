const { Schema, model } = require('mongoose');

const commentsSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Comments = model("Comments", commentsSchema);

module.exports = Comments;