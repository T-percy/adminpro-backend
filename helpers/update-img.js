const fs = require('fs-extra');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const deleteImage = (path) => {
    // Verificar si hay imagen guardada
    if (fs.pathExistsSync(path)) {
        // Eliminar imagen anterior
        fs.removeSync(path);
    }
}

const updateImage = async (tipo, id, filename) => {

    let pathOld = '';

    switch (tipo) {
        case 'medico':
            // Verificar si existe médico
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log(`No se encontró médico con el Id ${id}`);
                return false;
            }

            // Eliminar imagen previa
            pathOld = `./uploads/medico/${doctor.img}`;
            deleteImage(pathOld);

            // Guardar nueva imagen
            doctor.img = filename;
            await doctor.save();
            return true;
            
        break;

        case 'usuario':
            const user = await User.findById(id);
            if (!user) {
                console.log(`No se encontró usuario con el Id ${id}`);
                return false;
            }

            pathOld = `./uploads/usuario/${user.img}`;
            deleteImage(pathOld);

            user.img = filename;
            await user.save();
            return true;

        break;

        case 'hospital':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log(`No se encontró hospital con el Id ${id}`);
                return false;
            }

            pathOld = `./uploads/hospital/${hospital.img}`;
            deleteImage(pathOld);

            hospital.img = filename;
            await hospital.save();
            return true;
            
        break;
    
        default:
            break;
    }

}

module.exports = {
    updateImage
}