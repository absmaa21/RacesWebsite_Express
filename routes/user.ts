let express = require('express');
let router = express.Router();
const ObjectId = require("mongoose").ObjectId
const DiscordUser = require("../models/DiscordUser");
const passport = require('passport');

router.get('/', async function (req, res) {
    res.json(req.user)
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
