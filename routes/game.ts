import {IGame} from "../public/types";

let express = require('express');
let router = express.Router();
import mongoose from "mongoose";

const ObjectId = require("mongoose").ObjectId

const gameSchema = new mongoose.Schema<IGame>({
    name: {type: String, required: true},
});

const Game = mongoose.model<IGame>('Game', gameSchema);

router.get('/', async function (res) {
    try {
        const games = await Game.find();
        return res.json(games);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const game = await Game.findById(new ObjectId(req.params.id));
        if (!game) {
            return res.status(404).send("Game with id " + req.params.id + " not found!");
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.post('/add', async function (req, res) {
    if (!req.body.name) {
        return res.status(400).json({error: 'Body param "name" not found!'})
    }

    try {
        const game = new Game({
            name: req.body.name,
        });

        await game.save();

        res.status(201).json({
            game_id: game.id,
            name: game.name,
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
