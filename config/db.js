'use strict';

const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant({account:'4e556d2d-6136-4041-b869-0b75db86cacb-bluemix', password:'5aa578b9874f7ed32cbf4111e20b7a938c832a71ee266d7b8a460118cb58e6d0'});

const db = cloudant.db.use('test');

export default db;