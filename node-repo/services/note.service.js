import { addNote, deleteNote, updateNote,getNotes } from '../repositories/note.repository';

exports.addNote = (data) => {
    return new Promise((resolve, reject)=> {
        addNote(data)
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.getNotes = (data) => {
    return new Promise((resolve, reject)=> {
        getNotes(data)
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.deleteNote = (data) => {
    return new Promise((resolve, reject)=> {
        deleteNote(data)
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.updateNote = (data) => {
    return new Promise((resolve, reject)=> {
        updateNote(data)
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}