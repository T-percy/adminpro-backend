/* 
    Path: /api/hospital 
*/

const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const {getHospitals, createHospital, updateHospital, deleteHospital} = require('../controllers/hospital');

const router = Router();

router.get('/', 
    [
        validarJWT
    ], 
    getHospitals);

router.post('/', 
    [
        validarJWT,
        check('name', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos,
    ], 
    createHospital);

router.put('/:id', 
    [
        validarJWT,
        check('name', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos,
    ], 
    updateHospital);

router.delete('/:id', 
    [
        validarJWT
    ], 
    deleteHospital);

module.exports = router;