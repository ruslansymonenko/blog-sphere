import { Strategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';

export const passportCheck = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }

  const User = mongoose.model('user');

  passport.use(
    new Strategy(options, async (payload, done) => {
      try{
        const user = await User.findById(payload.userId);
        if(user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );
};