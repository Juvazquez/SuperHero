import express from 'express';
import { validarSuperheroe } from "../validations/superheroValidation.mjs";
import {
    obtenerSuperheroePorIdController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController, 
    actualizarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController,
    obtenerDashboardSuperheroes,
    agregarSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroeController,
    mostrarFormularioEditarController,
    mostrarFormularioAgregarController   
} from '../controllers/superheroesController.mjs';


const router = express.Router();

// Rutas API JSON
//router.get("/heroes", obtenerSuperheroesJSON);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
//router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

// CRUD
//router.post("/heroes", validarSuperheroe, crearSuperheroeController);
//router.put('/heroes/:id', validarSuperheroe, actualizarSuperheroeController);
//router.delete('/heroes/:id', eliminarSuperheroePorIdController);
//router.delete('/heroes/nombre/:nombreSuperHeroe', eliminarSuperheroePorNombreController);

// 🟢 Vista principal (dashboard con la lista)
router.get('/heroes', obtenerDashboardSuperheroes); // Renderiza dashboard.ejs con los datos

router.get('/heroes/agregar', mostrarFormularioAgregarController);
router.post('/heroes/agregar', validarSuperheroe, agregarSuperheroeController);


router.delete('/heroes/:id', eliminarSuperheroeController);

router.get('/heroes/editar/:id', mostrarFormularioEditarController);
router.put('/heroes/editar/:id', validarSuperheroe, editarSuperheroeController);



export default router;
