import { Express, Request,  Response } from "express";
import { Pool } from 'mysql2';

export const getFarmaciaRoute = (farmacia: Express, pool: Pool) => {
    farmacia.get('/view/farmacia', (req: Request, res: Response) => {
        res.render('farmacia')
    })
}

export default getFarmaciaRoute