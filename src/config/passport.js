const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //comprobar si existe el email
    const user = await User.findOne({email})
    if (!user) {
        return done(null, false, {message: 'No existe este usuario'});
    } else {
        //math password user
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});