import 'reflect-metadata';
import {createConnection, Connection} from 'typeorm';
import { Guest } from './models/guest';
import winston = require('winston');
export var DB:Connection;

export function initDB(callback:any) {
    createConnection({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Aa123456',
        database: 'test1',
        entities: [
            Guest
        ],
        synchronize: true,
        logging: false
    }).then(connection => {
        winston.info('Connected to DB succesfully!');
        DB = connection;
        callback();
    }).catch(error => console.log(error));
}
