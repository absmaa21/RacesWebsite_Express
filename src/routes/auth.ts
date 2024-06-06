let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}), (req, res) => {
    res.status(200);
});

router.get('/success', async function (req, res) {
    res.status(200);
});

router.get('/forbidden', async function (req, res) {
    res.status(500);
});

module.exports = router;
