'use strict';

import db from '../config/db';
import async from 'async';
import guid from 'uid';
import request from 'request';
//import urlencode from 'urlencode';

class TransactionController{
    sendMoney(from, to, value){
        let fromUser;
        let toUser;
        let transactionSend = {
            to: to,
            value: value * -1
        }
        let transactionRec = {
            from: from._id,
            value: value
        }
        return new Promise((resolve, reject) => {
            db.get(from._id, (err, data) => {
                if(err){
                    reject({status: 500, msg: 'DB Error', err: err});
                } else {
                    fromUser = data;
                    if(parseInt(fromUser.value) < value) {
                        reject({status: 500, msg: 'Insufficient funds'})
                    } else {
                        fromUser.value = (parseInt(fromUser.value) - value).toString();
                        fromUser.history.push(transactionSend);
                        db.get(to, (err, newData) => {
                            if(err) {
                                reject({status: 500, msg: 'DB Error', err: err});
                            } else {
                                toUser = newData;
                                toUser.value = parseInt(toUser.value) + value;
                                toUser.value = toUser.value.toString();
                                toUser.history.push(transactionRec);
                                db.insert(toUser, (err) => {
                                    if(err) {
                                        reject({status: 500, msg: 'DB Error', err: err});
                                    } else {
                                        db.insert(fromUser, (err) => {
                                            if(err) {
                                                reject({status: 500, msg: 'DB Error', err: err});
                                            } else {
                                                resolve();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
    }

    getStatement(user){
        return new Promise((resolve, reject) => {
            db.get(user, (err, body) => {
                if(err) {
                    reject({status: 500, msg: 'DB Error', err: err});
                } else {
                    resolve(body.history);
                }
            });
        });
    }

    getListOfClients(user){
        return new Promise((resolve, reject) => {
            db.list(async (err, data) => {
                if(err){
                    reject({status: 500, msg: 'DB Error', err: err});
                } else {
                    const res = Promise.resolve(data.rows.filter(item => item.id != user))
                    resolve(res);
                }
            });
        });
    }

    getBalance(user) {
        return new Promise((resolve, reject) => {
            db.get(user, (err, data) => {
                if(err) {
                    reject({err: err, status: 500, msg: 'DB Error'});
                } else {
                    resolve(data.value);
                }
            });
        });
    }
}

export default new TransactionController;
