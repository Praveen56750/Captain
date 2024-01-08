const User = require('../models/user');
const passport = require('passport')
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY_JWT_PASSPORT
}

const strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
    const id = jwt_payload.id;
    // usually this would be a database call:
    const userDetail = await User.findById(id).exec();

    if (userDetail) {
        const user = {
            id: userDetail.id,
            role: userDetail.role,
            privileges: userDetail.privilege
        };
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.use(strategy);
