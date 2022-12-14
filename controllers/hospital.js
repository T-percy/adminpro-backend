const {response} = require('express');
const Hospital = require('../models/hospital');


const createHospital = async (req, res= response) => {

    const uid = req.uid;
    const hospital = new Hospital({ user:uid, ...req.body });

    try {
        const hospitalDB = await hospital.save();

        res.json({ 
            ok: true,
            hospital: hospitalDB,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

const getHospitals = async (req, res= response) => {

    const hospitales = await Hospital.find()
                                    .populate('user', 'name img')
    res.json({ 
        ok: true,
        hospitales,
    });
}

const updateHospital = async (req, res= response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el ID',
            });
        }

        const changeHospital = {
            ...req.body,
            user: uid,
        }

        const updateHospital = await Hospital.findByIdAndUpdate(id, changeHospital, {new: true});

        res.json({ 
            ok: true,
            actualización: updateHospital
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

const deleteHospital = async (req, res= response) => {
    
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: `Hospital con el id ${id} no encontrado`,
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({ 
            ok: true,
            msg: `Hospital con id ${id} ha sido eliminado`,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            msg: 'Hable con el administrador',
        })
    }

}

module.exports = {
    createHospital,
    getHospitals,
    updateHospital,
    deleteHospital,
};