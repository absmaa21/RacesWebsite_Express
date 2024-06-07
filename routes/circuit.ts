import {ICircuit} from "../public/types";

let express = require('express');
let router = express.Router();
import mongoose from "mongoose";

const ObjectId = require("mongoose").ObjectId

const circuitSchema = new mongoose.Schema<ICircuit>({
    name: {type: String, required: true},
});

const Circuit = mongoose.model<ICircuit>('Circuit', circuitSchema);

router.get('/', async function (res) {
    try {
        const circuits = await Circuit.find();
        res.json(circuits);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const circuit = await Circuit.findById(new ObjectId(req.params.id));
        if (!circuit) {
            return res.status(404).send("Circuit with id " + req.params.id + " not found!");
        }
        res.json(circuit);
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
        const circuit = new Circuit({
            name: req.body.name,
        });

        await circuit.save();

        res.status(201).json({
            circuit_id: circuit.id,
            name: circuit.name
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
