import { Not, IsNull } from 'typeorm';
import * as express from 'express';
import { DB } from './orm';
import winston = require('winston');
import { Guest } from './interfaces/guest';
import { Guest as GuestORM } from './orm/models/guest';

export class API {
    static init(app:express.Application) {
        app.get('/api/getall', API.getAll);
        app.post('/api/addone', API.addOne);
        app.post('/api/addlot', API.addLot);
        app.post('/api/editone', API.editOne);
    }

    private static async getAll(req:express.Request, res:express.Response):Promise<any> {
        try {
            winston.info(`Got request to get all guests`);
            let guests:Guest[] = await DB.getRepository(GuestORM).find();
            winston.info(`Got all Guests`);
            res.send(guests);
        } catch (error) {
            winston.error(`There was an error getting all guests`, error);
            res.status(400).send(error);
        }
    }

    private static async addOne(req:express.Request, res:express.Response):Promise<any> {
        if (API.isGuestValid(req.body)) {
            try {
                winston.info(`Got request to add guest ${req.body.name} to list`);
                await DB.getRepository(GuestORM).save(new GuestORM(req.body.name, req.body.number));
                winston.info(`Added guest ${req.body.name} to list`);
                res.send(`OK`);
            } catch (error) {
                winston.error(`There was an error adding a guest ${req.body.name}`, error);
                res.status(400).send(error);
            }
        } else {
            let err:string = `There was an error adding a guest ${req.body.name}, no paramaters`;
            winston.error(err);
            res.status(400).send(err);
        }
    }

    private static async addLot(req:express.Request, res:express.Response):Promise<any> {
        if (req.body) {
            try {
                let guestsToAdd:GuestORM[] = [];
                for (let guest of req.body) {
                    if (API.isGuestValid(new GuestORM(guest.name, guest.number))) {
                        guestsToAdd.push(guest)
                    }
                }
                winston.info(`Got request to add guests to list`);
                await DB.getRepository(GuestORM).save(guestsToAdd);
                winston.info(`Added multiple guests to list`);
                res.send(`OK`);
            } catch (error) {
                winston.error(`There was an error adding multiple guests`, error);
                res.status(400).send(error);
            }
        } else {
            let err:string = `There was an error adding multiple guests, no paramaters`;
            winston.error(err);
            res.status(400).send(err);
        }
    }

    private static isGuestValid(guest:Guest):boolean {
        if (guest && guest.name && guest.number && guest.invited_count) {
            return true;
        }
        return false;
    }

    private static async editOne(req:express.Request, res:express.Response):Promise<any> {
        if (API.isGuestValid(req.body)) {
            try {
                winston.info(`Got request to edit guest ${req.body.name}`);
                await DB.getRepository(GuestORM).save(new GuestORM(req.body.name, req.body.number));
                winston.info(`Edited guest ${req.body.name}`);
                res.send(`OK`);
            } catch (error) {
                winston.error(`There was an error editing a guest ${req.body.name}`, error);
                res.status(400).send(error);
            }
        } else {
            let err:string = `There was an error editing a guest ${req.body.name}, no paramaters`;
            winston.error(err);
            res.status(400).send(err);
        }
    }
}