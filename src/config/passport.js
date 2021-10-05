import passport from "passport";
import passportJwt from "passport-jwt";
import User from "../models/userModel";

var JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.MY_SECRET;

passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, next) => {
    try {
      if (jwt_payload) {
        let user = await User.findUserByIdForSessionToUse(jwt_payload._id);
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      } else {
        next(null, false);
      }
    } catch (error) {
      return next(error, false);
    }
  })
);
