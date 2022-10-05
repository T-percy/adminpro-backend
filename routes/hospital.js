/* 
    Path: /api/hospital 
*/

const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const {getHospitales, createHospital, updateHospital, deleteHospital} = require('../controllers/hospital');

const router = Router();

router.get('/', 
    [
        
    ], 
    getHospitales);

router.post('/', 
    [
        validarJWT,
        check('name', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos,
    ], 
    createHospital);

router.put('/:id', 
    [
        
    ], 
    updateHospital);

router.delete('/:id', 
    [
        
    ], 
    deleteHospital);

module.exports = router;