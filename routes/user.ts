let express = require('express');
let router = express.Router();
let argon = require('argon2')

const ObjectId = require("mongoose").ObjectId
import User, {getUserWithoutPassword} from '../models/User'

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

        const encryptedPassword = await argon.hash(req.body.password)
        const user = new User({
            email: req.body.email,
            password: encryptedPassword,
            username: req.body.username ?? req.body.email.substring(0, req.body.email.indexOf('@')),
            picture: req.body.picture ?? 'https://ui-avatars.com/api/?name=' + req.body.email.substring(0, req.body.email.indexOf('@')),
            register_date: Date.now(),
        });

        await user.save();

        res.status(201).json(getUserWithoutPassword(user));
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

        if (await argon.verify(user.password, req.body.password)) {
            return res.status(401).json({error: 'Wrong credentials!'});
        }

        user.last_login = Date.now();
        await user.save();
        res.status(200).json(getUserWithoutPassword(user));
    } catch (err) {
        res.status(500).json({error: 'Internal server error.'});
        console.log(err);
    }
})

module.exports = router;
