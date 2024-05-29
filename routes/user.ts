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

const User = mongoose.model<IUser>('User', userSchema);

router.get('/', function(res) {
    res.json(User.find());
});

router.post('/register', async function (req, res) {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            register_date: Date.now(),
        });

        await user.save();

        res.status(201).json({
            user_id: user.user_id,
            email: user.email,
            register_date: user.register_date,
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

router.post('/login', async function (req, res) {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(401).send("Email not found!");
        }

        if (user.password !== req.body.password) {
            return res.status(401).send("Invalid password!");
        }

        user.last_login = Date.now();
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
