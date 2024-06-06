import {IRace} from "../public/types";

let express = require('express');
let router = express.Router();
import mongoose from "mongoose";

const ObjectId = require("mongoose").ObjectId

const raceSchema = new mongoose.Schema<IRace>({
    event_id: {type: ObjectId, required: true},
    circuit_id: {type: ObjectId, required: true},
    game_id: {type: ObjectId, required: true},
    start_date: {type: Number, required: true}
});

const Race = mongoose.model<IRace>('Race', raceSchema);

router.get('/', async function (res) {
    try {
        const races = await Race.find();
        return res.json(races);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const race = await Race.findById(new ObjectId(req.params.id));
        if (!race) {
            return res.status(404).send("Race with id " + req.params.id + " not found!");
        }
        res.json(race);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.post('/add', async function (req, res) {
    if (!req.body.circuit_id) {
        return res.status(400).json({error: 'Body param "circuit_id" not found!'})
    }

    if (!req.body.event_id) {
        return res.status(400).json({error: 'Body param "event_id" not found!'})
    }

    if (!req.body.circuit_id) {
        return res.status(400).json({error: 'Body param "game_id" not found!'})
    }

    if (!req.body.start_date) {
        return res.status(400).json({error: 'Body param "start_date" not found!'})
    }

    try {
        const race = new Race({
            event_id: req.body.event_id,
            circuit_id: req.body.circuit_id,
            game_id: req.body.game_id,
            start_date: req.body.start_date
        });

        await race.save();

        res.status(201).json({
            race_id: race.id,
            event_id: race.event_id,
            circuit_id: race.circuit_id,
            game_id: race.game_id,
            start_date: race.start_date
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
