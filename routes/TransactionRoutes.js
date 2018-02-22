'use strict';

import passport from 'passport'; 
import {Router} from 'express';

import TransactionController from '../controllers/TransactionController';

const router = new Router();

//SendMoney route
router.post('/sendmoney', passport.authenticate('BasicBearer', {session: false}), (req, res, next) => {
    const user = req.body.user;
    const value = parseInt(req.body.value);
    TransactionController.sendMoney(req.user, user, value)
        .then(() => {
            res.json({result: 'Success'});
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/bankstatement', passport.authenticate('BasicBearer', {session: false}), (req, res, next) => {
    TransactionController.getStatement(req.user._id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        });
});


router.get('/listofclients', passport.authenticate('BasicBearer', {session: false}), (req, res, next) => {
    TransactionController.getListOfClients(req.user._id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/balance', passport.authenticate('BasicBearer', {session: false}), (req, res, next) => {
    TransactionController.getBalance(req.user._id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        })
});

export default router;