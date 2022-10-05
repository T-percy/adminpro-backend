const path = require('path');
const fs = require('fs-extra');

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-img');


const fileUpload = (req, res= response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipos de archivos válidos
    const validTypes = ['medico', 'hospital', 'user'];

    if (!validTypes.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo de archivo seleccionado no es válido.'
        });
    }
    
    // Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo.'
        });
    }

    // PROCESAR IMAGEN...
    // 1. Extraer la imagen.
    const file = req.files.imagen;

    // 2. Extraer extensión del archivo.
    const filenameWithoutExtension = file.name.split('.');
    const fileExtension = filenameWithoutExtension [filenameWithoutExtension.length - 1];

    // 3. Validar extensión.
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'sólo permite extensiones: png, jpg, jpeg, gif'
        });
    }

    // 4. Generar el nombre del archivo
    const filename = `${uuidv4()}.${fileExtension}`;

    // 5. Crear Path para guardar la imagen
    const path = `./uploads/${tipo}/${filename}`;

    // Mover la imagen a cualquier lugar del servidor
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }

        // Actualizar Imagen
        updateImage( tipo, id, filename );

        res.json({ 
            ok: true,
            msg: 'Archivo subido',
            filename,
        });
    });
}

const returnImage = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile( pathImg);
    }else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg);
    }

}

module.exports = {
    fileUpload,
    returnImage,
};