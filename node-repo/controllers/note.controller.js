import { addNote, deleteNote, updateNote, getNotes } from '../services/note.service';

exports.addNote = (req, res) => {
    const params = {
        title: req.body.title,
        category: req.body.category,
        note: req.body.note
    }
    addNote(params)
        .then((response) => {
            res.status(200).json({ data: response });
        })
        .catch((error) => {
            res.status(400).json({ error: error});
        });
}

exports.getNotes = (req, res) => {
    getNotes()
        .then((response) => {
            res.status(200).json({ data: response });
        })
        .catch((error) => {
            res.status(400).json({ error: error});
        });
};

exports.deleteNote = (req, res) => {
    const id = req.body.id;
    deleteNote(id)
        .then((response) => {
            res.status(200).json({ data: response });
        })
        .catch((error) => {
            res.status(400).json({ error: error});
        });
}

exports.updateNote = (req, res) => {
    const params = {
        title: req.body.title,
        category: req.body.category,
        note: req.body.note,
        id: req.body.id,
        updateDate: new Date()
    }
    updateNote(params)
        .then((response) => {
            res.status(200).json({ data: response });
        })
        .catch((error) => {
            res.status(400).json({ error: error});
        });
}