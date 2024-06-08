const router = require('express').Router();

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
        res.redirect(process.env.FRONTEND_URL);
    }
    else {
        console.log("User is not logged in.");
        res.redirect('/auth');
    }
}

router.get('/', (req, res) => {
    if(req.user) {
        console.log("User is logged in.");
        res.json({ loggedIn: true, redirectUrl: process.env.FRONTEND_URL, lastAuth: Date.now() });
    } else {
        console.log("User is not logged in.");
        res.json({ loggedIn: false, redirectUrl: process.env.FRONTEND_URL + '/login'});
    }
});

module.exports = router;
