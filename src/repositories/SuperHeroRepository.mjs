import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        const filtro = {};
        filtro[atributo] = valor;
        return await SuperHero.find(filtro);
    }
    

    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    async crearSuperheroe(datos) {
        const nuevoSuperheroe = new SuperHero(datos);
        return await nuevoSuperheroe.save();
    }
    
    async actualizarSuperheroe(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }
    async eliminarSuperheroe(id) {
        return await SuperHero.findByIdAndDelete(id);
    }
    async eliminarSuperheroePorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: new RegExp(`^${nombre}$`, "i") });
    }
    
}

export default new SuperHeroRepository();
