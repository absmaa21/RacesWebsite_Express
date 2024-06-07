import {IEvent} from "../public/types";

let express = require('express');
let router = express.Router();
import mongoose from "mongoose";

const ObjectId = require("mongoose").ObjectId

const eventSchema = new mongoose.Schema<IEvent>({
    name: {type: String, required: true},
    organizers: {type: [String], required: true}
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

router.get('/', async function (res) {
    try {
        const events = await Event.find();
        return res.json(events);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const event = await Event.findById(new ObjectId(req.params.id));
        if (!event) {
            return res.status(404).send("Event with id " + req.params.id + " not found!");
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.post('/add', async function (req, res) {
    if (!req.body.name) {
        return res.status(400).json({error: 'Body param "name" not found!'})
    }

    if (!req.body.organizers) {
        res.status(400).json({error: 'Body param "organizers" not found!'})
    }

    try {
        const event = new Event({
            name: req.body.name,
            organizers: req.body.organizers,
        });

        await event.save();

        res.status(201).json({
            event_id: event.id,
            name: event.name,
            class: event.organizers
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
