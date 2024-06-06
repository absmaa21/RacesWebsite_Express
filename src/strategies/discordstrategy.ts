const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const { clientId, clientSecret, redirectUrl } = require('../public/config.json')

passport.use(new DiscordStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: redirectUrl,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken,
    profile, done) => {
    console.log(profile.username);
    console.log(profile.id);
    console.log(profile.guilds.length)
}))
