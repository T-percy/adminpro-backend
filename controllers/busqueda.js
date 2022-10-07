const {response} = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getAll = async (req, res= response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        User.find({name: regex}),
        Doctor.find({name: regex}),
        Hospital.find({name: regex}),
    ])

    res.json({ 
        ok: true,
        busqueda,
        users,
        doctors,
        hospitals,
    });
}

const getCollection = async (req, res= response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'usuarios':
            data = await User.find({name: regex});
            break;

        case 'medicos':
            data = await Doctor.find({name: regex})
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
            break;

        case 'hospitales':
            data = await Hospital.find({name: regex})
                                .populate('user', 'name img');
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser una de las siguientes tres opciones: usuarios o medicos u hospitales'
            });
    }

    res.json({ 
        ok: true,
        resultados: data,
    });
}

module.exports = {
    getAll,
    getCollection,
};