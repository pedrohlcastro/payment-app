'use strict';

const PORT =  ( process.env.PORT || 8000 );
const ENV = process.env.NODE_ENV || 'dev';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import passport from 'passport';
import fileUploader from 'express-fileupload';
import compress from 'shrink-ray';
import helmet from 'helmet';

import configEnv from './config/envConfig';
import configPassportLocalStrategy from './config/Auth/passportLocalConfig';
import configBearerStrategy from './config/Auth/passportBearerConfig';

import AuthRoutes from './routes/AuthRoutes';
import TransactionRoutes from './routes/TransactionRoutes';

const app = express();

//config gzip compress
if (ENV != 'test'){
    app.use(compress({
        cache: (req, res) => {
            return true;
        },
        brotli: {
            quality: 6
        },
        zlib: {
            quality: 6
        }
    }));
}
app.use(morgan(ENV));
app.use(cors());
app.use(passport.initialize());
configPassportLocalStrategy(passport);
configBearerStrategy(passport);
app.use(passport.session({session: false}));

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUploader());

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist/')));

//API routes goes here
app.use('/api/auth', AuthRoutes);
app.use('/api/transac', TransactionRoutes);

//Call Angular
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//manage config per environment
configEnv(app);

app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log('[BackEnd] -> http://localhost:' + PORT);
});

export default app;