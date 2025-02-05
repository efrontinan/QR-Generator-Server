"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signUp = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 11;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
    User_model_1.default
        .findOne({ email })
        .then(user => {
        if (user) {
            console.log('User already exists');
            res.status(401).json({ message: 'User already exists.' });
            return;
        }
        const salt = bcryptjs_1.default.genSaltSync(saltRounds);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        return User_model_1.default.create({
            email,
            password: hashedPassword,
            username,
            birth
        });
    })
        .then(newUser => res.status(201).json(newUser))
        .catch(err => next(err));
};
exports.signUp = signUp;
const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        console.log('Provide email and password');
        res.status(401).json({ message: 'Provide email and password' });
        return;
    }
    User_model_1.default
        .findOne({ email })
        .then(user => {
        if (!user) {
            res.status(401).json({ message: 'This user does not exist' });
            return;
        }
        const isCorrectPwd = bcryptjs_1.default.compareSync(password, user.password);
        if (!isCorrectPwd) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        const { _id, email, username } = user;
        const payload = { _id, email, username };
        const authToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '6h' });
        res.json({ authToken });
    });
};
exports.loginUser = loginUser;
