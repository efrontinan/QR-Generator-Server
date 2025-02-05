import User from '../models/User.model';
import { genSaltSync, hashSync } from "bcrypt-ts";
const saltRounds = 11;
const signUp = (req, res, next) => {
    const { email, password, username, birth } = req.body;
    if (email === '' || password === '' || username === '' || birth === '') {
        console.log('Email, username, password and birth date are mandatory.');
        res.status(409).json({ message: 'Email, username, password and birth date are mandatory.' });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        console.log('Provide a valid email address.');
        res.status(409).json({ message: 'Provide a valid email address.' });
        return;
    }
    User
        .findOne({ email })
        .then(user => {
        if (user) {
            console.log('User already exists');
            res.status(401).json({ message: 'User already exists.' });
            return;
        }
        const salt = genSaltSync(saltRounds);
        const hashedPassword = hashSync(password, salt);
        return User.create({
            email,
            password: hashedPassword,
            username,
            birth
        });
    })
        .then(newUser => res.status(201).json(newUser))
        .catch(err => next(err));
};
export { signUp };
