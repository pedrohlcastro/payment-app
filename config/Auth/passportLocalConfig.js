'use strict'

import {Strategy as LocalStrategy} from 'passport-local';
import db from '../db';
import AuthController from '../../controllers/AuthController'

const configPassportLocalStrategy = (passport) =>{
    passport.use('local', new LocalStrategy((username, password, done) => {
        db.get(username, (err, user) => {
            console.log(user);
            if (err) return done(err);
            if (!user) return done(null, false, {'message': 'User not found'});
            if (AuthController.comparePsw(password, user.password)) return done(null, user);
            return done(null, false, {'message': 'Password does not match'});
        });
    }));
}

export default configPassportLocalStrategy;