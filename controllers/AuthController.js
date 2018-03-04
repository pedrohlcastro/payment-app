'use strict';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import authConfig from '../config/authConfig';
import db from '../config/db';

class AuthController {
    hashPsw(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    };
    
    comparePsw(password, hash) {
        return bcrypt.compareSync(password, hash);
    };

    createUser(user) {
        return new Promise(async (resolve, reject) => {
            //check if a password was provided
            if (user.password == undefined) {
                reject({status: 409, msg: 'Cannot create that user', err: null});
            }
            let newUser = user;
            user.value ? newUser.value = user.value : newUser.value = '0';
            newUser.history = [];
            newUser.password = this.hashPsw(user.password);
            
            db.get(user.email, (err, body) => {
                if(body) {
                    reject({status: 409, msg: 'Cannot create that user - User already exist', err: null});
                } else {
                    db.insert(newUser, user.email, (err, body) => {
                        if(err) {
                            reject({err: err, status: 500, msg: 'DB Error'});
                        } else {
                            resolve(body);
                        }
                    });
                }
            });
        });
    };
    
    signInUser(err, user, info) {
        return new Promise((resolve, reject) => {
            if (err){
                reject({status: 500, msg: 'Internal Erro', err: err});
            }
            if(!user){
                reject({status: 401, msg: info.message, err: null});
            }
            let payload = {
                id: user._id
            }
            let options =  { 
                expiresIn: "2 days" 
            }
            let token = 'Bearer ';
            token += jwt.sign(payload, authConfig.secret, options);
            resolve({result: "Success", token: token, userType: user.userType});
        });
    };
    
    checkToken(user) {
        return new Promise((resolve, reject) => {
            if (user) {
                let resJSON = {
                    result: 'Success',
                    user: user
                }
                resolve(resJSON)
            }
            reject({status: 401, msg: '', err: null});
        });
    };
}



export default new AuthController;