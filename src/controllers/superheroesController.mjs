import { validationResult } from "express-validator";
import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearSuperheroe, actualizarSuperheroe,
    eliminarSuperheroePorId, eliminarSuperheroePorNombre 
  } from '../services/superheroesService.mjs';
import { renderizarListaSuperheroes, renderizarSuperheroe } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).json({ message: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el superhéroe',
            error: error.message });
    }
}

//  Para Postman (JSON)
//  GET - JSON para API
export async function obtenerSuperheroesJSON(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.json(superheroes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}


export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los superhéroes',
            error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los superhéroes',
            error: error.message });
    }
}

export async function crearSuperheroeController(req, res) {
    // Verificar si hay errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevoSuperheroe = await crearSuperheroe(req.body);
        res.status(201).json(nuevoSuperheroe);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el superhéroe", error: error.message });
    }
}

export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (!superheroeActualizado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json(superheroeActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el superhéroe", error: error.message });
    }
}
export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorId(id);

        if (!superheroeEliminado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json({ mensaje: "Superhéroe eliminado", superheroe: superheroeEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);

        res.status(200).json({
            mensaje: "Superhéroe eliminado",
            superheroe: superheroeEliminado
        });
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}


//  Controlador para procesar el formulario y agregar superhéroe
export async function agregarSuperheroeController(req, res) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevoSuperheroe = await crearSuperheroe(req.body);
        res.redirect("/api/heroes"); //  Redirigir al dashboard después de crear
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar el superhéroe", error: error.message });
    }
}

export async function editarSuperheroeController(req, res) {
    //  Verificar errores de validación antes de procesar la solicitud
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

        res.redirect('/api/heroes'); //  Redirige al Dashboard tras editar
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error: error.message });
    }
}
export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        await eliminarSuperheroePorId(id);
        res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
}

export async function mostrarFormularioEditarController(req, res) {
    const { id } = req.params; //extrae id de la url

    try {
        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado');
        }

        res.render('editSuperhero', { 
            layout: 'layout',
            title: 'Editar Superhéroes',
            superheroe });
    } catch (error) {
        res.status(500).send('Error al obtener el superhéroe');
    }
}

export async function obtenerDashboardSuperheroes(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.render("dashboard", { 
            layout: 'layout',
            title: 'Dashboard - Superhéroes',
            superheroes
        });
    } catch (error) {
        res.status(500).send("Error al cargar el dashboard");
    }
}
export function mostrarFormularioAgregarController(req, res) {
    res.render('addSuperhero',{
            layout: 'layout',
            title: 'Agregar Superhéroes'

    }); // Sin lógica extra porque no cargás datos
}