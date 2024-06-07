const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const {clientId, clientSecret, redirectUrl} = require('../public/config.json')
const DiscordUser = require("../models/DiscordUser")

passport.serializeUser((user, done) => {
    console.log('Serialize ' + user.discordId);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log('Deserialize ' + id);
    const user = DiscordUser.findById(id);
    if (user) done(null, user);
})

passport.use(new DiscordStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: redirectUrl,
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken,
          profile, done) => {
    try {
        const user = await DiscordUser.findOne({discordId: profile.id});
        if (user) {
            console.log('User already exists. ' + user.discordId)
            done(null, user);
        } else {
            console.log('Created new User. ' + profile.id)
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
            });
            await newUser.save();
            done(null, newUser);
        }
    } catch (err) {
        console.log(err)
        done(err, null)
    }
}))
