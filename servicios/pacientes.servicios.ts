import {Router, Request, Response} from 'express'

const pacientes = Router()


pacientes.get('/view/pacientes', (req: Request, res: Response ) => {
    res.render('pacientes')
})




export default pacientes