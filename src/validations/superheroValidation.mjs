import { body } from "express-validator";

export const validarSuperheroe = [
    body("nombreSuperHeroe")
        .trim()
        .notEmpty().withMessage("El nombre del superhéroe es obligatorio")
        .isLength({ min: 3, max: 60 }).withMessage("El nombre debe tener entre 3 y 60 caracteres"),

    body("nombreReal")
        .trim()
        .notEmpty().withMessage("El nombre real es obligatorio")
        .isLength({ min: 3, max: 60 }).withMessage("El nombre real debe tener entre 3 y 60 caracteres"),

    body("edad")
        .notEmpty().withMessage("La edad es obligatoria")
        .isInt({ min: 0 }).withMessage("La edad debe ser un número entero y no negativo"),

    body("poderes")
        .isArray().withMessage("Poderes debe ser un array") // Verifica que sea un array
        .notEmpty().withMessage("Debe haber al menos un poder en la lista") // Verifica que no esté vacío
        .custom((poderes) => {
            for (let poder of poderes) {
                if (typeof poder !== "string") {
                    throw new Error("Cada poder debe ser un texto");
                }
                if (poder.trim().length < 3 || poder.trim().length > 60) {
                    throw new Error("Cada poder debe tener entre 3 y 60 caracteres");
                }
            }
            return true;
        })
];
