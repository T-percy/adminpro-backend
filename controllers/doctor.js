const {response} = require('express');
const Doctor = require('../models/doctor');


const createDoctor = async (req, res= response) => {

    const uid = req.uid;
    const doctor = new Doctor({ user:uid, ...req.body });

    try {

        const doctorDB = await doctor.save();
        res.json({ 
            ok: true,
            doctor: doctorDB,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

const getDoctors = async (req, res= response) => {

    const doctors = await Doctor.find({}, 'name img')
                                .populate('user', 'name img')
                                .populate('hospital', 'name img')

    res.json({ 
        ok: true,
        doctors,
    });
}

const updateDoctor = async (req, res= response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const doctorDB = await Doctor.findById(id);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: `Medico no encontrado con el Id ${id}`,
            });
        }

        const changeDoctor = {
            ...req.body,
            user: uid,
        }

        const updateDoctor = await Doctor.findByIdAndUpdate(id, changeDoctor, {new: true});

        res.json({ 
            ok: true,
            actualización: updateDoctor
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

const deleteDoctor = async (req, res= response) => {
    const id = req.params.id;
    try {
        const doctorDB = await Doctor.findById(id);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: `Medico con el id ${id} no fue encontrado`,
            });
        }

        await Doctor.findByIdAndDelete(id);

        res.json({ 
            ok: true,
            msg: `Medico con id ${id} ha sido eliminado`,
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
    createDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor,
};