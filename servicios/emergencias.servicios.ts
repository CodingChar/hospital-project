import { time } from 'console';
import { Request, Response} from 'express';
import { Express } from 'express';

import { Pool } from 'mysql2';

const getEmergenciasRoute = (emergencias:Express, pool: Pool) => {
    emergencias.get('/view/emergencias', (req: Request,res: Response) => {
        res.render('emergencias.ejs')
    })
    emergencias.post('/emergencias', (req: Request, res: Response) => {
        const info = req.body;
        res.status(200).json(info)
        setTimeout((() => 0), 5000)
        res.redirect('/view/emergencias')
    })
}

export default getEmergenciasRoute