const db = require('../models/index');
const Note = db.Note;
import * as constants from '../util/constants';

exports.addNote = (param) => {
    return new Promise((resolve, reject) => {
        const note = new Note(param);
        note.save(function (err, response) {
            if (err) {
                return reject(err);
            }
            return resolve(response);
        });
    });
}

exports.getNotes = () => {
    return new Promise((resolve, reject) => {
        Note.find({}, function (err, response) {
            if (err) {
                return reject(err);
            }
            return resolve(response);
        });
    });
}

exports.deleteNote = (id) => {
    return new Promise((resolve, reject) => {
        Note.findByIdAndRemove(id, function (err, response) {
            if (response && response._id) {
                return resolve(constants.SUCCESS_MESSAGE.NOTE_DELETED_SUCCESSFULLY);
            } else {
                return reject(constants.ERROR_MESSAGE.ID_NOT_EXISTS);
            }
        });
    });
}

exports.updateNote = (params) => {
    return new Promise((resolve, reject) => {
        Note.findByIdAndUpdate(params.id, params, { new: true }, function (err, response) {
            if (response && response.id) {
                return resolve(response);
            } else {
                return reject(constants.ERROR_MESSAGE.ID_NOT_EXISTS);
            }   
        });
    });
}

