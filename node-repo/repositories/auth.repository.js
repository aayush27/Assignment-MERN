const bcrypt = require('bcryptjs');
const db = require('../models/index');
const User = db.User;
import * as constants from '../util/constants';

exports.signup = (userParam) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: userParam.email }, function (err, response) {
            if (response && response.email === userParam.email) return reject(constants.ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);

            const user = new User(userParam);

            if (userParam.password) {
                user.password = bcrypt.hashSync(userParam.password, 10);
            }

            user.save(function (err, response) {
                resolve(response);
            });
        });
    });
}

exports.login = (data) => {
    return new Promise((resolve, reject) => {
        let response = {};
        User.findOne({ email: data.email }, (err, user) => {
            if (user && bcrypt.compareSync(data.password, user.password)) {
                return resolve(user);
            } else {
                return reject(constants.ERROR_MESSAGE.USER_UNAUTHORIZED);
            }
        });
    });
}