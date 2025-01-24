import { Request, Response } from 'express';


//get servicios
export const getServiciosRoute = (app: any) => {
    app.get('/servicios', (req: Request, res: Response) => {
        res.send('Servicios');
    });
};


export const getServicios = (req: Request, res: Response) => {
    res.send('Servicios');
};

export default getServicios;
