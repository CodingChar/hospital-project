import { Request, Response} from 'express';
import { Express } from 'express';

import { Pool } from 'mysql2';

const getEmergenciasRoute = (emergencias:Express, pool: Pool) => {
    emergencias.get('/view/emergencias', (req: Request,res: Response) => {
        res.render('emergencias.ejs')
    })
}

export default getEmergenciasRoute