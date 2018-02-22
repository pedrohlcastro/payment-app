'use strict';

import passport from 'passport'; 
import {Router} from 'express';

import AuthController from '../controllers/AuthController';

const router = new Router();

//SignUp route
router.post('/signup', (req, res, next) => {
    const user = req.body;
    AuthController.createUser(user)
        .then(() => {
            res.status(201).json({result: 'Success'});
        })
        .catch((err) => {
            next(err);
        });
});

//SignIn route
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        return AuthController.signInUser(err, user, info)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    })(req, res, next);
});

//Check JWT in HEADERS: Authorization
router.get('/checktoken',passport.authenticate('BasicBearer', {session: false}), (req, res, next) => {
    passport.authenticate('BasicBearer', {session: false}, (err, user, info) => {
        return AuthController.checkToken(user)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    })(req, res, next);
});

export default router;