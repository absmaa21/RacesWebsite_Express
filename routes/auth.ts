let express = require('express');
let router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: process.env.FRONTEND_URL,
    successRedirect: process.env.FRONTEND_URL,
}));

router.get('/logout', (req, res) => {
    if(req.user) req.logout();
    res.redirect('/');
})

router.get('/user', (req, res) => {
    console.log(req.user)
    res.json({})
})

module.exports = router;
