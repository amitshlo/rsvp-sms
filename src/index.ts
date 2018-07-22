import * as plivo from 'plivo';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { SMSOut } from './sms/out';
import winston = require('winston');
import { initDB } from './orm';
import { API } from './api';
import { SMSIn } from './sms/in';

//Use PLIVO_AUTH_ID and PLIVO_AUTH_TOKEN env vars
export const client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);

initDB(() => {
    const APPLICATION_PORT = process.env.ZOOKEEPER_JSON_PORT ? process.env.ZOOKEEPER_JSON_PORT : 9010;
    const app:express.Application = express();
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    API.init(app);
    SMSOut.init(app);
    SMSIn.init(app);
    app.listen(APPLICATION_PORT, () => {
        winston.info(`App is running on port ${APPLICATION_PORT}. Have Fun!`);
    });
});





