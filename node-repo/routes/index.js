import express from 'express';
import auth from './auth.route';
import { addNote, deleteNote, updateNote, getNotes } from '../controllers/note.controller';
import { tokenValidator } from '../middleware/auth.middleware';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Hello world!' });
});

router.use('/auth', auth);

router.get('/getNotes', getNotes);
router.post('/addNote', tokenValidator, addNote);
router.delete('/deleteNote', tokenValidator, deleteNote);
router.put('/updateNote', tokenValidator, updateNote);

module.exports = router;
