const fs = require('fs-extra');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

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
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontró médico con el Id');
                return false;
            }

            // Eliminar imagen previa
            pathOld = `./uploads/medico/${medico.img}`;
            deleteImage(pathOld);

            // Guardar nueva imagen
            medico.img = filename;
            await medico.save();
            return true;
            
        break;

        case 'user':
            const user = await User.findById(id);
            if (!user) {
                console.log('No se encontró usuario con el Id');
                return false;
            }

            pathOld = `./uploads/user/${user.img}`;
            deleteImage(pathOld);

            user.img = filename;
            await user.save();
            return true;

        break;

        case 'hospital':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontró hospital con el Id');
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