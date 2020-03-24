let JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt,
    User = require("../models/User");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY_JWT_PASSPORT;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(err);
                });
        })
    );
};
