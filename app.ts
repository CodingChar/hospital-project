import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import { getServiciosRoute } from './servicios/get.servicios';
import getInventarioRoute from './servicios/inventario.servicios';
import { getHistorialClinicoRoute } from './servicios/historialclinico.servicios';
import createUserRoute from './servicios/newuser.servicios';
import hospitalizacionesRoute from './servicios/hospitalizaciones';

const app = express();
const port = 2001;
const host = '0.0.0.0';  // Para escuchar todas las interfaces

//maiu

//express views 
app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'));
app.use(express.static('./public/scripts'));
app.use(express.static('./public/styles'))

// MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',  // IP del servidor remoto
    user: 'root',           // Usuario de la base de datos
    password: 'A25bd1e23',  // Contraseña de la base de datos
    database: 'SistemaHospital', // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('API de Gestión Hospitalaria');
});

// Usar la ruta de inventario
getInventarioRoute(app, pool);

// Importar y usar la ruta de inventario con el pool de conexión
getServiciosRoute(app);

// Usar la ruta de historial clínico
getHistorialClinicoRoute(app, pool);

// Usar la ruta de pacientes
createUserRoute(app, pool);

//Usar la ruta de hospitalizaciones
hospitalizacionesRoute(app, pool);

// Start the Express server
app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
});



// lsof -i :2001 | grep LISTEN