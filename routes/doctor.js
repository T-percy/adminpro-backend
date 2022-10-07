/* 
    Path: /api/doctor 
*/

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')

const {getDoctors, createDoctor, updateDoctor, deleteDoctor} = require('../controllers/doctor');

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getDoctors);

router.post('/', 
    [
        validarJWT,
        check('name', 'El nombre del médico es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos,
    ], 
    createDoctor);

router.put('/:id', 
    [
        validarJWT,
        check('name', 'El nombre del médico es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos,
    ], 
    updateDoctor);

router.delete('/:id', 
    [
        validarJWT
    ], 
    deleteDoctor);

module.exports = router;