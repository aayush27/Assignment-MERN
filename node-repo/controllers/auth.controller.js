import { signup, login } from '../services/auth.service';

exports.signup = (req, res) => {
    const params = {
        email: req.body.email,
        password: req.body.password
    }
    signup(params)
        .then((response) => {
            res.status(200).json({ user: response });
        })
        .catch((error) => {
            res.status(400).json({ error: error});
        });
}

exports.login = (req, res) => {
    const params = {
        email: req.body.email,
        password: req.body.password
    }
    login(params)
        .then((response) => {
            res.status(200).json({ user: response });
        })
        .catch((error) => {
            res.status(400).json({ error: error});
        });
}