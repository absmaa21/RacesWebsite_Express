let express = require('express');
let router = express.Router();
const ObjectId = require("mongoose").ObjectId
const DiscordUser = require("../models/DiscordUser");


router.get('/', async function (req, res) {
    try {
        const users = await DiscordUser.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
        console.log(e)
    }
});

router.get('/:id', async function (req, res) {
    try {
        const user = await DiscordUser.find(new ObjectId(req.params.id))
        res.json(user);
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
        console.log(e)
    }
});

module.exports = router;
