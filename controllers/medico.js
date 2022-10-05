const {response} = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res= response) => {

    const medicos = await Medico.find({}, 'name img')
                                .populate('user', 'name img')
                                .populate('hospital', 'name img')

    res.json({ 
        ok: true,
        medicos,
    });
}

const updateMedico = (req, res= response) => {
    res.json({ 
        ok: true,
        msg: 'updateMedico',
    });
}

const createMedico = async (req, res= response) => {

    const uid = req.uid;
    const medico = new Medico({ user:uid, ...req.body });

    try {

        const medicoDB = await medico.save();
        res.json({ 
            ok: true,
            medico: medicoDB,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

const deleteMedico = (req, res= response) => {
    res.json({ 
        ok: true,
        msg: 'deleteMedico',
    });
}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,
};