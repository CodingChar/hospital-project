import { Request, Response, Router } from 'express';
import { Express } from 'express';
import { Pool, RowDataPacket, OkPacket } from 'mysql2';

interface Paciente {
    PacienteID?: number;
    Nombre: string;
    Apellido: string;
    FechaNacimiento: string;
    Sexo: string;
    Direccion?: string;
    Telefono?: string;
}

const createUserRoute = (app: Express, pool: Pool): void => {
    const router = Router();

    // Crear nuevo paciente
    router.post('/newuser', async (req: Request, res: Response): Promise<void> => {
        const { Nombre, Apellido, FechaNacimiento, Sexo, Direccion, Telefono } = req.body as Paciente;

        // Verificar que los campos requeridos estén presentes
        if (!Nombre || !Apellido || !FechaNacimiento || !Sexo) {
            res.status(400).json({
                error: 'Faltan campos requeridos'
            });
            return;
        }

        const query = 'INSERT INTO Pacientes (Nombre, Apellido, FechaNacimiento, Sexo, Direccion, Telefono) VALUES (?, ?, ?, ?, ?, ?)';
        
        try {
            const [results] = await pool.promise().query<OkPacket>(
                query, 
                [Nombre, Apellido, FechaNacimiento, Sexo, Direccion, Telefono]
            );

            res.status(201).json({
                message: 'Paciente creado exitosamente',
                id: results.insertId,
                paciente: {
                    PacienteID: results.insertId,
                    Nombre,
                    Apellido,
                    FechaNacimiento,
                    Sexo,
                    Direccion,
                    Telefono
                }
            });
        } catch (err) {
            console.error('Error al crear paciente:', err);
            res.status(500).json({
                error: 'Error al crear el paciente',
                details: err instanceof Error ? err.message : 'Error desconocido'
            });
        }
    });

    // Obtener todos los pacientes
    router.get('/pacientes', async (req: Request, res: Response): Promise<void> => {
        try {
            const [results] = await pool.promise().query<RowDataPacket[]>('SELECT * FROM Pacientes');
            res.json(results);
        } catch (err) {
            console.error('Error al obtener pacientes:', err);
            res.status(500).json({
                error: 'Error al obtener pacientes'
            });
        }
    });

    // Obtener paciente por ID
    router.get('/pacientes/:id', async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try {
            const [results] = await pool.promise().query<RowDataPacket[]>(
                'SELECT * FROM Pacientes WHERE PacienteID = ?', 
                [id]
            );

            if (results.length === 0) {
                res.status(404).json({
                    error: 'Paciente no encontrado'
                });
                return;
            }

            res.json(results[0]);
        } catch (err) {
            console.error('Error al obtener paciente:', err);
            res.status(500).json({
                error: 'Error al obtener paciente'
            });
        }
    });

    // Usar las rutas en la app
    app.use('/', router);
};

export default createUserRoute;
