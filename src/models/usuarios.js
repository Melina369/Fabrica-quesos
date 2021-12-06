const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
    cuenta: String,
    pass: String,
    view: String
});

module.exports = mongoose.model('usuarios', users);