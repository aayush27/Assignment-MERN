import { signup, login } from '../repositories/auth.repository';
const jwt = require('jsonwebtoken');

exports.signup = (data) => {
    return new Promise((resolve, reject)=> {
        signup(data)
            .then((response) => {
                return resolve(response);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.login = (data) => {
    return new Promise((resolve, reject)=> {
        let final = {}
        login(data)
            .then((response) => {
                final = JSON.parse(JSON.stringify(response));
                delete final.password;
                const token = jwt.sign({ email: response.email }, process.env.SECRET_KEY);
                return token;
            })
            .then((token) => {
                final.token = token;
                return resolve(final);  
            })
            .catch((error) => {
                return reject(error);
            })
    });
}