import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from "path";
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';
import {obtenerDashboardSuperheroes} from './controllers/superheroesController.mjs';



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
connectDB();

//Configurar EJS como motor de plantillas 
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Archivo base de layout


// Servir archivos estáticos
app.use(express.static(path.join(process.cwd(), "public")));


// 🟢 Muy importante: esto va antes de tus rutas
app.use(express.urlencoded({ extended: true })); // para leer el body de los forms
app.use(methodOverride('_method')); // para que pueda leer el override en POST
// Usar rutas separadas

app.use('/api', superHeroRoutes); // API en /api/heroes


// Ruta principal 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pagina principal'
    });
});
// Ruta para la pagina Acerca de 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Acerca de Nosotros'
    });
});
// Ruta para la pagina Contacto
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contactanos'
    });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

