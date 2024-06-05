import {IVehicle} from "../public/types";

let express = require('express');
let router = express.Router();
import mongoose from "mongoose";

const ObjectId = require("mongoose").ObjectId

const vehicleSchema = new mongoose.Schema<IVehicle>({
    name: {type: String, required: true},
    class: {type: String, required: true},
});

const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema);

router.get('/', async function (res) {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const vehicle = await Vehicle.findById(new ObjectId(req.params.id));
        if (!vehicle) {
            return res.status(404).send("Circuit with id " + req.params.id + " not found!");
        }
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
});

router.post('/add', async function (req, res) {
    if (!req.body.name) {
        return res.status(400).json({error: 'Body param "name" not found!'})
    }

    if (!req.body.class) {
        return res.status(400).json({error: 'Body param "class" not found!'})
    }

    try {
        const vehicle = new Vehicle({
            name: req.body.name,
            class: req.body.class,
        });

        await vehicle.save();

        res.status(201).json({
            vehicle_id: vehicle.id,
            name: vehicle.name,
            class: vehicle.class
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
