import {IUser, IUserRace} from "../public/types";

let express = require('express');
let router = express.Router();
import mongoose from "mongoose";

const ObjectId = require("mongoose").ObjectId

const userRaceSchema = new mongoose.Schema<IUserRace>({
    race_id: {type: ObjectId, required: true},
    vehicle_id: {type: ObjectId, required: true},
    position_qualifying_overall: {type: Number, required: true},
    position_race_overall: {type: Number, required: true},
    position_qualifying_class: {type: Number, required: false},
    position_race_class: {type: Number, required: false},
});

const userSchema = new mongoose.Schema<IUser>({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    picture: {type: String, required: true},
    last_login: {type: Number, required: false},
    register_date: {type: Number, required: true, default: Date.now()},
    races: {type: [userRaceSchema], required: true, default: []}
});

const User = mongoose.model<IUser>('User', userSchema);

router.get('/', async function (req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
        console.log(e)
    }
});

router.get('/:id', async function (req, res) {
    try {
        const user = await User.find(new ObjectId(req.params.id))
        res.json(user);
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
        console.log(e)
    }
});

router.post('/register', async function (req, res) {
    if (!req.body.email) {
        return res.status(400).json({error: 'Body param "email" not found!'})
    }

    if (!req.body.password) {
        return res.status(400).json({error: 'Body param "password" not found!'})
    }

    try {
        const testUser = await User.find({email: req.body.email})

        if (testUser.length > 0) {
            res.status(409).json({error: "Email already used!"})
            return;
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username ?? req.body.email.substring(0, req.body.email.indexOf('@')),
            picture: req.body.picture ?? 'https://ui-avatars.com/api/?name=' + req.body.email.substring(0, req.body.email.indexOf('@')),
            register_date: Date.now(),
        });

        await user.save();

        res.status(201).json({
            user_id: user.id,
            email: user.email,
            username: user.username,
            picture: user.picture,
            register_date: user.register_date,
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

router.post('/login', async function (req, res) {
    if (!req.body.email) {
        return res.status(400).json({error: 'Body param "email" not found!'})
    }

    if (!req.body.password) {
        return res.status(400).json({error: 'Body param "password" not found!'})
    }

    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(401).json({error: 'Email not found!'});
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({error: 'Password invalid!.'});
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
