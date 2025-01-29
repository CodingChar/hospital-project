import { Request, Response } from 'express';
import { Express } from 'express';
import { Pool } from 'mysql2';

const getInventarioRoute = (app: Express, pool: Pool) => {
    // Obtener todo el inventario
    app.get('/inventario', (req: Request, res: Response) => {
        pool.query('SELECT * FROM Farmacia', (err, results) => {
            if (err) {
                console.error('Error en consulta:', err);
                return res.status(500).json({ error: 'Error al obtener inventario' });
            }
            res.json(results);
        });
    });

    // Obtener medicamento por ID
    app.get('/inventario/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        pool.query('SELECT * FROM Farmacia WHERE MedicamentoID = ?', [id], (err, results: any) => {
            if (err) {
                console.error('Error en consulta:', err);
                return res.status(500).json({ error: 'Error al obtener medicamento' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Medicamento no encontrado' });
            }
            res.json(results[0]);
        });
    });

    // Crear medicamento
    app.post('/inventario', (req: Request, res: Response) => {
        const { Nombre, Descripcion, Cantidad, PrecioUnitario } = req.body;
        
        const query = 'INSERT INTO Farmacia (Nombre, Descripcion, Cantidad, PrecioUnitario) VALUES (?, ?, ?, ?)';
        
        pool.query(query, [Nombre, Descripcion, Cantidad, PrecioUnitario], (err: any, results: any) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ 
                message: 'Medicamento agregado exitosamente',
                id: results.insertId 
            });
        });
    });

    // Actualizar medicamento
    app.put('/inventario/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        const { Nombre, Descripcion, Cantidad, PrecioUnitario } = req.body;
        
        const query = 'UPDATE Farmacia SET Nombre = ?, Descripcion = ?, Cantidad = ?, PrecioUnitario = ? WHERE MedicamentoID = ?';
        
        pool.query(query, [Nombre, Descripcion, Cantidad, PrecioUnitario, id], (err: any, results: any) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ 
                message: 'Medicamento actualizado exitosamente'
            });
        });
    });

    // Eliminar medicamento
    app.delete('/inventario/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        
        const query = 'DELETE FROM Farmacia WHERE MedicamentoID = ?';
        
        pool.query(query, [id], (err: any, results: any) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ 
                message: 'Medicamento eliminado exitosamente'
            });
        });
    });

    app.get('/view/hospitalizaciones', (req: Request, res: Response) => {
        res.render('hospitalizaciones')
    })
}

export default getInventarioRoute;