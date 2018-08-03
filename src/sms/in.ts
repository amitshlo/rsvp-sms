import { Not, IsNull } from 'typeorm';
import * as express from 'express';
import winston = require('winston');

import { client } from '..';
import { Guest } from '../interfaces/guest';
import { DB } from '../orm';
import { Guest as GuestORM } from '../orm/models/guest';

export class SMSIn {
    static init(app:express.Application) {
        app.post('/in', SMSIn.getSms);
    }

    private static async getSms(req:express.Request, res:express.Response):Promise<any> {
        console.log(req.body, req.query, 'got somthing');
        res.send({body: req.body, req: req.query, msg: 'got somthing'});
    }
/*     private static async sendToAllVoid(req:express.Request, res:express.Response):Promise<any> {
        winston.info(`Got request from ${req.ip} to send non-responded guests rsvp`);
        let guests:Guest[] = await DB.getRepository(GuestORM).find({ where: {
            rsvp_count: IsNull()
        }});
        winston.info(`Sending to ${guests.length} numbers.`);
        let successNumbers:string[] = [];
        let failNumbers:string[] = [];
        for (let guest of guests) {
            try {
                successNumbers.push(await SMSIn.handleMessage(guest));
            } catch (error) {
                failNumbers.push(error);
            }
        } 
        winston.info(`Successfully executed request from ${req.ip} to send non-responded guests rsvp.`);
        res.send({successNumbers, failNumbers});
    }

    private static handleMessage(guest:Guest):Promise<any> {
        return new Promise(async (resolve:any, reject:any) => {
            client.messages.create(
                '972522222222',
                guest.number,
                `שלום ${guest.name}, הינך מוזמן לחתונה של ספיר ועמית בתאריך 21.10.2018 באגדתא.`
            ).then(
                (response) => {
                    winston.info(`Sent message to number ${guest.number} with id ${response.apiId}`)
                    resolve(guest.number)
                },
                (err) => {
                    winston.error(err.message);
                    reject(guest.number);
                }
            );
        });
    } */
}