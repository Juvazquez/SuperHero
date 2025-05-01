import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { 
        type: String, 
        required: [true, "El nombre del superheroe es obligatorio"], 
        trim: true,  // Elimina espacios en blanco al inicio y final
        minlength: [3, "El nombre del superheroe debe tener al menos 3 caracteres"], 
        maxlength: [60, "El nombre del superheroe no puede tener más de 60 caracteres"]
    },
    nombreReal: { 
        type: String, 
        required: [true, "El nombre real del superheroe es obligatorio"], 
        trim: true,  // Elimina espacios en blanco al inicio y final
        minlength: [3, "El nombre real del superheroe debe tener al menos 3 caracteres"], 
        maxlength: [60, "El nombre real del superheroe no puede tener más de 60 caracteres"]
    },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creador: String,
    createdAt: { type: Date, default: Date.now }
});

const superHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-09');

export default superHero;
