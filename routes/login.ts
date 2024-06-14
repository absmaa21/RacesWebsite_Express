const router = require('express').Router();

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log("User is logged in.");
        next();
    } else {
        console.log("User is not logged in.");
        res.redirect('/auth');
    }
}

router.get('/', isAuthorized, (req, res) => {
    console.log(req.user.discordId)
    res.json({loggedIn: true, redirectUrl: process.env.FRONTEND_URL, lastAuth: Date.now()});
});

module.exports = router;
