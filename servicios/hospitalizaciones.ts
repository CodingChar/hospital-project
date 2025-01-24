import { Request, Response, Router } from 'express';
import { Express } from 'express';
import { Pool, RowDataPacket, OkPacket } from 'mysql2';

interface Hospitalizacion {
    HospitalizacionID?: number;
    PacienteID: number;
    FechaIngreso: string;
    FechaAlta?: string;
    Habitacion: string;
    Cama: string;
    NotaMedica?: string;
}

const hospitalizacionesRoute = (app: Express, pool: Pool): void => {
    const router = Router();

    // Crear nueva hospitalización
    router.post('/hospitalizaciones', async (req: Request, res: Response): Promise<void> => {
        const { PacienteID, FechaIngreso, Habitacion, Cama, NotaMedica } = req.body as Hospitalizacion;

        if (!PacienteID || !FechaIngreso || !Habitacion || !Cama) {
            res.status(400).json({
                error: 'Faltan campos requeridos'
            });
            return;
        }

        try {
            const [results] = await pool.promise().query<OkPacket>(
                'INSERT INTO Hospitalizaciones (PacienteID, FechaIngreso, Habitacion, Cama, NotaMedica) VALUES (?, ?, ?, ?, ?)',
                [PacienteID, FechaIngreso, Habitacion, Cama, NotaMedica]
            );

            res.status(201).json({
                message: 'Hospitalización registrada exitosamente',
                id: results.insertId
            });
        } catch (err) {
            console.error('Error al registrar hospitalización:', err);
            res.status(500).json({
                error: 'Error al registrar hospitalización',
                details: err instanceof Error ? err.message : 'Error desconocido'
            });
        }
    });

    // Obtener todas las hospitalizaciones
    router.get('/hospitalizaciones', async (req: Request, res: Response): Promise<void> => {
        try {
            const [results] = await pool.promise().query<RowDataPacket[]>(`
                SELECT h.*, p.Nombre, p.Apellido 
                FROM Hospitalizaciones h
                JOIN Pacientes p ON h.PacienteID = p.PacienteID
            `);
            res.json(results);
        } catch (err) {
            console.error('Error al obtener hospitalizaciones:', err);
            res.status(500).json({
                error: 'Error al obtener hospitalizaciones'
            });
        }
    });

    // Obtener hospitalización por ID
    router.get('/hospitalizaciones/:id', async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            const [results] = await pool.promise().query<RowDataPacket[]>(
                `SELECT h.*, p.Nombre, p.Apellido 
                FROM Hospitalizaciones h
                JOIN Pacientes p ON h.PacienteID = p.PacienteID
                WHERE h.HospitalizacionID = ?`,
                [id]
            );

            if (results.length === 0) {
                res.status(404).json({
                    error: 'Hospitalización no encontrada'
                });
                return;
            }

            res.json(results[0]);
        } catch (err) {
            console.error('Error al obtener hospitalización:', err);
            res.status(500).json({
                error: 'Error al obtener hospitalización'
            });
        }
    });

    // Registrar alta de paciente
    router.put('/hospitalizaciones/:id/alta', async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const { FechaAlta, NotaMedica } = req.body;

        if (!FechaAlta) {
            res.status(400).json({
                error: 'La fecha de alta es requerida'
            });
            return;
        }

        try {
            const [results] = await pool.promise().query<OkPacket>(
                'UPDATE Hospitalizaciones SET FechaAlta = ?, NotaMedica = ? WHERE HospitalizacionID = ?',
                [FechaAlta, NotaMedica, id]
            );

            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: 'Hospitalización no encontrada'
                });
                return;
            }

            res.json({
                message: 'Alta registrada exitosamente'
            });
        } catch (err) {
            console.error('Error al registrar alta:', err);
            res.status(500).json({
                error: 'Error al registrar alta'
            });
        }
    });

    // Usar las rutas en la app
    app.use('/', router);
};

export default hospitalizacionesRoute;


