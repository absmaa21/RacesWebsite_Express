import {IUser} from "../public/types";

let express = require('express');
let router = express.Router();
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema<IUser>({
    user_id: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    last_login: {type: Number, required: false},
    register_date: {type: Number, required: true, default: Date.now()},
});

export const User = mongoose.model<IUser>('User', userSchema);

router.get('/', function(res) {
    res.json(User.find());
});

router.post('/register', async function (req, res) {
    try {
        const user = new User();

        user.email = req.body.email;
        user.password = req.body.password;

        await user.save();

        res.status(201);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

router.post('/login', async function (req, res) {
    try {
        res.json(User.find(req.body.email, req.body.password));
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
