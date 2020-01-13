const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', schema);