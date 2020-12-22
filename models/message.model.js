//Dependencies
const mongoose = require('mongoose');

//Create schema
const messageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('messages', messageSchema);
