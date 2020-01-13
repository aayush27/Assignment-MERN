const router = express.Router();
import express from 'express';
import { signup, login } from '../controllers/auth.controller';
import { tokenValidator } from '../middleware/auth.middleware';

// router.get('/login', login);

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;