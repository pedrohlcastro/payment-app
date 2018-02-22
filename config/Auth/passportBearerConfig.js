'use strict';

import jwt from 'jsonwebtoken';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import authConfig from '../authConfig';
import db from '../db';

const configBearerStrategy = (passport) => {
    // anyone can access
    passport.use('BasicBearer', new BearerStrategy((token, done) => {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return done({ status: 401, msg:'Unauthorized', err: err});
            let userId = decoded.id;
            db.get(userId, (err, user) => {
                if (err) return done({ status: 401, msg:'Unauthorized', err: err});
                let reqUser = {
                    _id: userId,
                }
                return done(null, reqUser);
            });
        });
    }));
}

export default configBearerStrategy;