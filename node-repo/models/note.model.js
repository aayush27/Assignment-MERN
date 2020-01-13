const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String },
    category: { type: String },
    note: { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    isDeleted: { type: Boolean }
});

module.exports = mongoose.model('Note', schema);