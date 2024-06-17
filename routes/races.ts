let express = require('express');
let router = express.Router();

import User, {getUserWithoutPassword} from '../models/User'
const ObjectId = require("mongoose").ObjectId

router.get('/', async function (req, res) {
    try {
        const user = await User.findById(new ObjectId(req.body.userId))
        if (!user) {
            return res.status(401).json({error: 'Id not found!'});
        }
        return res.json(user.get('races'));
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.post('/add', async function (req, res) {
    if (!req.body.userId) {
        return res.status(400).json({error: 'Body param "userId" not found!'})
    }
    if (!req.body.circuit) {
        return res.status(400).json({error: 'Body param "circuit" not found!'})
    }
    if (!req.body.event) {
        return res.status(400).json({error: 'Body param "event" not found!'})
    }
    if (!req.body.circuit) {
        return res.status(400).json({error: 'Body param "game" not found!'})
    }
    if (!req.body.vehicle) {
        return res.status(400).json({error: 'Body param "vehicle" not found!'})
    }
    if (!req.body.start_date) {
        return res.status(400).json({error: 'Body param "start_date" not found!'})
    }
    if (!req.body.duration) {
        return res.status(400).json({error: 'Body param "duration" not found!'})
    }
    if (!req.body.position_qualifying_overall) {
        return res.status(400).json({error: 'Body param "position_qualifying_overall" not found!'})
    }
    if (!req.body.position_race_overall) {
        return res.status(400).json({error: 'Body param "position_race_overall" not found!'})
    }

    const raceObj = {
        event: req.body.event,
        circuit: req.body.circuit,
        game: req.body.game,
        vehicle: req.body.vehicle,
        start_date: Date.parse(req.body.start_date),
        duration: req.body.duration,
        position_qualifying_overall: req.body.position_qualifying_overall,
        position_race_overall: req.body.position_race_overall,
        position_qualifying_class: req.body.position_qualifying_class,
        position_race_class: req.body.position_race_class,
    }

    try {
        const user = await User.findById(req.body.userId)
        if (!user) {
            res.status(400).json({error: 'User not found!'})
        }
        await User.updateOne(
            { _id: req.body.userId },
            { $push: { races: raceObj } }
        );
        res.status(201).json('Successful update');
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
