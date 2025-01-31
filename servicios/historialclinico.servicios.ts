import { Request, Response } from 'express';
import { Express } from 'express';
import { Pool } from 'mysql2';





export const getHistorialClinicoRoute = (app: Express, pool: Pool) => {
    app.get('/historias-clinicas', (req: Request, res: Response) => {
        res.render('historias-clinicas')
    });

    app.post('/historias-clinicas', (req: Request, res: Response) => {
        const { PacienteID, Fecha, Diagnostico, Tratamiento, Observaciones } = req.body;
        
        console.log(req.body);
        
        let query = `
            SELECT 
                h.*, 
                p.Nombre, 
                p.Apellido,
                p.FechaNacimiento,
                p.Sexo,
                p.Direccion,
                p.Telefono
            FROM Historias_Clinicas h
            JOIN Pacientes p ON h.PacienteID = p.PacienteID
            WHERE 1=1
        `;
        let params = [];
        
        if (PacienteID) {
            query += ' AND h.PacienteID = ?';
            params.push(PacienteID);
        }
        if (Fecha) {
            query += ' AND h.Fecha = ?';
            params.push(Fecha);
        }
        if (Diagnostico) {
            query += ' AND h.Diagnostico LIKE ?';
            params.push(`%${Diagnostico}%`);
        }
        if (Tratamiento) {
            query += ' AND h.Tratamiento LIKE ?';
            params.push(`%${Tratamiento}%`);
        }
        if (Observaciones) {
            query += ' AND h.Observaciones LIKE ?';
            params.push(`%${Observaciones}%`);
        }

        pool.query(query, params, (err: any, results: any) => {
            if (err) {
                return res.status(500).json({ error: 'Error al ejecutar la consulta en la base de datos', details: err.message });
            }
            res.status(200).json(results);
        });
    });

    app.post('/view/historias-clinicas', (req: Request, res: Response) => {
        const { PacienteID, Fecha, Diagnostico, Tratamiento, Observaciones } = req.body;
        
        console.log(req.body);
        
        let query = `
            SELECT 
                h.*, 
                p.Nombre, 
                p.Apellido,
                p.FechaNacimiento,
                p.Sexo,
                p.Direccion,
                p.Telefono
            FROM Historias_Clinicas h
            JOIN Pacientes p ON h.PacienteID = p.PacienteID
            WHERE 1=1
        `;
        let params = [];
        
        if (PacienteID) {
            query += ' AND h.PacienteID = ?';
            params.push(PacienteID);
        }
        if (Fecha) {
            query += ' AND h.Fecha = ?';
            params.push(Fecha);
        }
        if (Diagnostico) {
            query += ' AND h.Diagnostico LIKE ?';
            params.push(`%${Diagnostico}%`);
        }
        if (Tratamiento) {
            query += ' AND h.Tratamiento LIKE ?';
            params.push(`%${Tratamiento}%`);
        }
        if (Observaciones) {
            query += ' AND h.Observaciones LIKE ?';
            params.push(`%${Observaciones}%`);
        }

        pool.query(query, params, (err: any, results: any) => {
            if (err) {
                return res.status(500).json({ error: 'Error al ejecutar la consulta en la base de datos', details: err.message });
            }
            res.render('view-historial', {paciente: results[0]});
        });
    });
};

export default getHistorialClinicoRoute;