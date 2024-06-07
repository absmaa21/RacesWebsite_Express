let express = require('express');
let router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}), (req, res) => {
    res.send(req.user);
});

router.get('/success', async function (req, res) {
    res.status(200);
});

router.get('/forbidden', async function (req, res) {
    res.status(500);
});

module.exports = router;
